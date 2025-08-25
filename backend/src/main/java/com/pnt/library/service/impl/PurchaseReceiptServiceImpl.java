package com.pnt.library.service.impl;

import com.pnt.library.converter.PurchaseReceiptConverter;
import com.pnt.library.enums.PurchaseReceiptStatus;
import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptRequestDTO;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptResponseDTO;
import com.pnt.library.model.dto.purchaseReceiptBook.PurchaseReceiptBookRequestDTO;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.PurchaseReceiptBookEntity;
import com.pnt.library.model.entity.PurchaseReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import com.pnt.library.repository.BookRepository;
import com.pnt.library.repository.PurchaseReceiptBookRepository;
import com.pnt.library.repository.PurchaseReceiptRepository;
import com.pnt.library.repository.ReaderRepository;
import com.pnt.library.service.PurchaseReceiptService;
import jakarta.persistence.criteria.Join;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
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
public class PurchaseReceiptServiceImpl implements PurchaseReceiptService {
    private final PurchaseReceiptRepository purchaseReceiptRepository;
    private final PurchaseReceiptConverter purchaseReceiptConverter;
    private final ReaderRepository readerRepository;
    private final PurchaseReceiptBookRepository purchaseReceiptBookRepository;
    private final BookRepository bookRepository;

    @Override
    public List<PurchaseReceiptResponseDTO> getPurchaseReceipts(Map<String, String> params) {
        Specification<PurchaseReceiptEntity> specification = Specification.where(null);

        if (params.containsKey("readerName")) {
            String readerName = params.get("readerName").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("readerEntity").get("username")), "%" + readerName + "%")
            );
        }

        if (params.containsKey("bookName")) {
            String bookName = params.get("bookName").toLowerCase();
            specification = specification.and((root, query, cb) -> {
                Join<Object, Object> receiptBookEntityJoin = root.join("PurchaseReceiptBooks");
                Join<Object, Object> bookEntityJoin = receiptBookEntityJoin.join("book");
                return cb.like(cb.lower(bookEntityJoin.get("name")), "%" + bookName + "%");
            });
        }

        if (params.containsKey("status")) {
            String status = params.get("status");
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("status"), PurchaseReceiptStatus.valueOf(status))
            );
        }

        if (params.containsKey("createDate")) {
            LocalDate date = LocalDate.parse(params.get("createDate"));
            LocalDateTime startOfDay = date.atStartOfDay();
            LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

            specification = specification.and((root, query, cb) ->
                    cb.between(root.get("createDate"), startOfDay, endOfDay));
        }

        if (params.containsKey("totalPrice")) {
            BigDecimal totalPrice = new BigDecimal(params.get("totalPrice"));
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("totalPrice"), totalPrice)
            );
        }

        List<PurchaseReceiptEntity> purchaseReceiptEntities = purchaseReceiptRepository.findAll(specification);

        List<PurchaseReceiptResponseDTO> purchaseReceiptResponseDTOS = new ArrayList<>();
        for (PurchaseReceiptEntity purchaseReceiptEntity : purchaseReceiptEntities) {
            purchaseReceiptResponseDTOS.add(purchaseReceiptConverter.toPurchaseReceiptDTO(purchaseReceiptEntity));
        }
        return purchaseReceiptResponseDTOS;
    }

    @Override
    public PurchaseReceiptResponseDTO getPurchaseReceiptById(Long id) {
        return purchaseReceiptConverter.toPurchaseReceiptDTO(findPurchaseReceiptById(id));
    }

    @Override
    public PurchaseReceiptResponseDTO createPurchaseReceipt(PurchaseReceiptRequestDTO dto) {
        //find reader
        ReaderEntity readerEntity = findReaderById(dto.getReaderId());

        //convert
        PurchaseReceiptEntity purchaseReceiptEntity = purchaseReceiptConverter
                .toPurchaseReceiptEntity(dto, readerEntity);

        //set status and date time
        purchaseReceiptEntity.setStatus(PurchaseReceiptStatus.PENDING);
        purchaseReceiptEntity.setCreateDate(LocalDateTime.now());

        //create purchase receipt book
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<PurchaseReceiptBookEntity> purchaseReceiptBookEntities = new ArrayList<>();
        for (PurchaseReceiptBookRequestDTO purchaseReceiptBookRequestDTO : dto.getBooks()) {
            PurchaseReceiptBookEntity purchaseReceiptBook = new PurchaseReceiptBookEntity();
            purchaseReceiptBook.setPurchaseReceipt(purchaseReceiptEntity);
            purchaseReceiptBook.setQuantity(purchaseReceiptBookRequestDTO.getQuantity());
            purchaseReceiptBook.setBook(findBookById(purchaseReceiptBookRequestDTO.getBookId()));
            purchaseReceiptBook.setPrice(
                    purchaseReceiptBook.getBook().getPurchasePrice().multiply(
                            BigDecimal.valueOf(purchaseReceiptBook.getQuantity())
                    )
            );
            purchaseReceiptBookEntities.add(purchaseReceiptBook);
            totalPrice = totalPrice.add(purchaseReceiptBook.getPrice());
        }
        purchaseReceiptEntity.setPurchaseReceiptBooks(purchaseReceiptBookEntities);

        //set total price
        purchaseReceiptEntity.setTotalPrice(totalPrice);

        return purchaseReceiptConverter.toPurchaseReceiptDTO(
                purchaseReceiptRepository.save(purchaseReceiptEntity)
        );
    }

    @Override
    public void deletePurchaseReceipt(Long id) {
        purchaseReceiptRepository.delete(findPurchaseReceiptById(id));
    }

    @Override
    public PurchaseReceiptResponseDTO approvePurchaseReceipt(Long id) {
        PurchaseReceiptEntity entity = findPurchaseReceiptById(id);
        entity.setStatus(PurchaseReceiptStatus.APPROVED);
        return purchaseReceiptConverter.toPurchaseReceiptDTO(
                purchaseReceiptRepository.save(entity));
    }

    @Override
    public PurchaseReceiptResponseDTO receivePurchaseReceipt(Long id) {
        PurchaseReceiptEntity entity = findPurchaseReceiptById(id);
        entity.setStatus(PurchaseReceiptStatus.RECEIVED);
        return purchaseReceiptConverter.toPurchaseReceiptDTO(
                purchaseReceiptRepository.save(entity));
    }

    private ReaderEntity findReaderById(Long readerId) {
        return readerRepository.findById(readerId)
                .orElseThrow(() -> new ResourceNotFoundException("reader with id " + readerId + " not found"));
    }

    private PurchaseReceiptEntity findPurchaseReceiptById(Long id) {
        return purchaseReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Purchase receipt with id " + id + " not found"));
    }

    private BookEntity findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " not found"));
    }
}
