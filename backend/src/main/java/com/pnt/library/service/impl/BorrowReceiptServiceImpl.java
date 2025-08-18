package com.pnt.library.service.impl;

import com.pnt.library.converter.BorrowReceiptConverter;
import com.pnt.library.enums.BorrowReceiptStatus;
import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptRequestDTO;
import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptResponseDTO;
import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookRequestDTO;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import com.pnt.library.repository.BookRepository;
import com.pnt.library.repository.BorrowReceiptBookRepository;
import com.pnt.library.repository.BorrowReceiptRepository;
import com.pnt.library.repository.ReaderRepository;
import com.pnt.library.service.BorrowReceiptService;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BorrowReceiptServiceImpl implements BorrowReceiptService {
    private final BorrowReceiptRepository borrowReceiptRepository;
    private final BorrowReceiptConverter borrowReceiptConverter;
    private final ReaderRepository readerRepository;
    private final BorrowReceiptBookRepository borrowReceiptBookRepository;
    private final BookRepository bookRepository;

    @Override
    public List<BorrowReceiptResponseDTO> getBorrowReceipts(Map<String, String> params) {
        Specification<BorrowReceiptEntity> specification = Specification.where(null);

        if (params.containsKey("readerName")) {
            String readerName = params.get("readerName").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("readerEntity").get("username")), "%" + readerName + "%")
            );
        }

        if (params.containsKey("bookName")) {
            String bookName = params.get("bookName").toLowerCase();
            specification = specification.and((root, query, cb) -> {
                Join<Object, Object> receiptBookEntityJoin = root.join("borrowReceiptBooks");
                Join<Object, Object> bookEntityJoin = receiptBookEntityJoin.join("book");
                return cb.like(cb.lower(bookEntityJoin.get("name")), "%" + bookName + "%");
            });
        }

        if (params.containsKey("status")) {
            String status = params.get("status");
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("status"), BorrowReceiptStatus.valueOf(status))
            );
        }

        if (params.containsKey("createDate")) {
            LocalDate date = LocalDate.parse(params.get("createDate"));
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

            specification = specification.and((root, query, cb) ->
                    cb.between(root.get("createDate"), startOfDay, endOfDay));
        }

        if (params.containsKey("borrowDate")) {
            LocalDate date = LocalDate.parse(params.get("borrowDate"));
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            specification = specification.and((root, query, cb) ->
                    cb.between(root.get("borrowDate"), startOfDay, endOfDay));
        }

        if (params.containsKey("returnDate")) {
            LocalDate date = LocalDate.parse(params.get("returnDate"));
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
            specification = specification.and((root, query, cb) ->
                    cb.between(root.get("returnDate"), startOfDay, endOfDay));
        }
        List<BorrowReceiptEntity> borrowReceiptEntities = borrowReceiptRepository.findAll(specification);

        List<BorrowReceiptResponseDTO> borrowReceiptResponseDTOS = new ArrayList<>();
        for (BorrowReceiptEntity borrowReceiptEntity : borrowReceiptEntities) {
            borrowReceiptResponseDTOS.add(borrowReceiptConverter.toBorrowReceiptDTO(borrowReceiptEntity));
        }
        return borrowReceiptResponseDTOS;
    }

    @Override
    public BorrowReceiptResponseDTO getBorrowReceiptById(Long id) {
        return borrowReceiptConverter.toBorrowReceiptDTO(findBorrowReceiptById(id));
    }

    @Override
    public BorrowReceiptResponseDTO createBorrowReceipt(BorrowReceiptRequestDTO dto) {
        //find reader
        ReaderEntity readerEntity = findReaderById(dto.getReaderId());

        //convert
        BorrowReceiptEntity borrowReceiptEntity = borrowReceiptConverter
                .toBorrowReceiptEntity(dto, readerEntity);

        //set status and date time
        borrowReceiptEntity.setStatus(BorrowReceiptStatus.BORROWING);
        borrowReceiptEntity.setBorrowDate(LocalDateTime.now());
        borrowReceiptEntity.setReturnDate(LocalDateTime.now().plusDays(7));

        //create borrow receipt book
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<BorrowReceiptBookEntity> borrowReceiptBookEntities = new ArrayList<>();
        for (BorrowReceiptBookRequestDTO borrowReceiptBookRequestDTO : dto.getBooks()) {
            BorrowReceiptBookEntity borrowReceiptBook = new BorrowReceiptBookEntity();
            borrowReceiptBook.setBorrowReceipt(borrowReceiptEntity);
            borrowReceiptBook.setQuantity(borrowReceiptBookRequestDTO.getQuantity());
            borrowReceiptBook.setBook(findBookById(borrowReceiptBookRequestDTO.getBookId()));
            borrowReceiptBook.setPrice(
                    borrowReceiptBook.getBook().getBorrowPrice().multiply(
                            BigDecimal.valueOf(borrowReceiptBook.getQuantity())
                    )
            );
            borrowReceiptBookEntities.add(borrowReceiptBook);
            totalPrice = totalPrice.add(borrowReceiptBook.getPrice());
        }
        borrowReceiptEntity.setBorrowReceiptBooks(borrowReceiptBookEntities);

        //set total price
        borrowReceiptEntity.setTotalPrice(totalPrice);
        
        return borrowReceiptConverter.toBorrowReceiptDTO(
                borrowReceiptRepository.save(borrowReceiptEntity)
        );
    }

    @Override
    public void deleteBorrowReceipt(Long id) {
        borrowReceiptRepository.delete(findBorrowReceiptById(id));
    }

    @Override
    public BorrowReceiptResponseDTO returnBorrowReceipt(Long id) {
        BorrowReceiptEntity entity = findBorrowReceiptById(id);
        entity.setStatus(BorrowReceiptStatus.RETURNED);
        entity.setReturnDate(LocalDateTime.now());
        return borrowReceiptConverter.toBorrowReceiptDTO(borrowReceiptRepository.save(entity));
    }

    private BorrowReceiptEntity findBorrowReceiptById(Long id) {
        return borrowReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt with id " + id + " not found"));
    }

    private ReaderEntity findReaderById(Long readerId) {
        return readerRepository.findById(readerId)
                .orElseThrow(() -> new ResourceNotFoundException("reader with id " + readerId + " not found"));
    }

    private BorrowReceiptBookEntity findBorrowReceiptBookById(Long id) {
        return borrowReceiptBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt book with id " + id + " not found"));
    }

    private BookEntity findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " not found"));
    }

    @Scheduled(cron = "0 0 0 * * ?") //0h every day
    public void updateOverdueScheduled() {
        List<BorrowReceiptEntity> receipts = borrowReceiptRepository.findAllByStatus(BorrowReceiptStatus.BORROWING);
        for (BorrowReceiptEntity receipt : receipts) {
            if (LocalDateTime.now().isAfter(receipt.getReturnDate())) {
                receipt.setStatus(BorrowReceiptStatus.OVERDUE);
                borrowReceiptRepository.save(receipt);
            }
        }
    }

    public void updateOverdue(BorrowReceiptEntity receipt) {
        if (receipt.getStatus().equals(BorrowReceiptStatus.BORROWING) && LocalDateTime.now().isAfter(receipt.getReturnDate())) {
            receipt.setStatus(BorrowReceiptStatus.OVERDUE);
            borrowReceiptRepository.save(receipt);
        }
    }
}


