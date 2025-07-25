package com.pnt.library.service.impl;

import com.pnt.library.converter.BookConverter;
import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.dto.book.BookRequestDTO;
import com.pnt.library.model.dto.book.BookResponseDTO;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.repository.BookRepository;
import com.pnt.library.repository.BorrowReceiptBookRepository;
import com.pnt.library.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookConverter bookConverter;
    private final BorrowReceiptBookRepository borrowReceiptBookRepository;

    @Override
    public List<BookResponseDTO> getBooks(Map<String, String> params) {
        Specification<BookEntity> specification = Specification.where(null);

        if (params.containsKey("author")) {
            String author = params.get("author").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("author")), "%" + author + "%"));
        }

        if (params.containsKey("description")) {
            String desc = params.get("description").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("description")), "%" + desc + "%"));
        }

        if (params.containsKey("isbn")) {
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("isbn"), params.get("isbn")));
        }

        if (params.containsKey("publisher")) {
            String publisher = params.get("publisher").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("publisher")), "%" + publisher + "%"));
        }

        if (params.containsKey("category")) {
            String category = params.get("category").toLowerCase();
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("category")), "%" + category + "%"));
        }

        if (params.containsKey("year")) {
            Integer year = Integer.parseInt(params.get("year"));
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("year"), year));
        }

        if (params.containsKey("quantity")) {
            Integer quantity = Integer.parseInt(params.get("quantity"));
            specification = specification.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("quantity"), quantity));
        }

        List<BookEntity> bookEntities = bookRepository.findAll(specification);

        List<BookResponseDTO> bookResponseDTOS = new ArrayList<>();
        for (BookEntity bookEntity : bookEntities) {
            BookResponseDTO bookResponseDTO = bookConverter.toBookDTO(bookEntity);
            bookResponseDTOS.add(bookResponseDTO);
        }
        return bookResponseDTOS;
    }

    @Override
    public BookResponseDTO getBookById(Long id) {
        BookEntity bookEntity = findBookById(id);
        return bookConverter.toBookDTO(bookEntity);
    }

    @Override
    public BookResponseDTO createBook(BookRequestDTO dto) {
        BookEntity bookEntity = bookConverter.toBookEntity(dto);
        return bookConverter.toBookDTO(bookRepository.save(bookEntity));
    }

    @Override
    public void deleteBook(Long id) {
        BookEntity bookEntity = findBookById(id);
        //remove borrow receipt book from borrow receipt
        for (BorrowReceiptBookEntity borrowReceiptBook : bookEntity.getBorrowReceiptBooks()) {
            BorrowReceiptEntity borrowReceipt = borrowReceiptBook.getBorrowReceipt();
            borrowReceipt.getBorrowReceiptBooks().remove(borrowReceiptBook);
        }
        //delete borrow receipt book

        bookRepository.delete(bookEntity);
    }

    @Override
    public BookResponseDTO updateBook(Long id, BookRequestDTO dto) {
        BookEntity bookEntity = findBookById(id);
        //get borrow receipt book
        if (dto.getBorrowReceiptBookIds() == null) {
            dto.setBorrowReceiptBookIds(new ArrayList<>());
        }
        List<BorrowReceiptBookEntity> borrowReceiptBookEntities = findBorrowReceiptBooksByIds(dto.getBorrowReceiptBookIds());

        bookConverter.updateBookEntity(dto, bookEntity, borrowReceiptBookEntities);
        return bookConverter.toBookDTO(bookRepository.save(bookEntity));
    }

    private BookEntity findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " not found"));
    }

    private List<BorrowReceiptBookEntity> findBorrowReceiptBooksByIds(List<Long> borrowReceiptBookIds) {
        List<BorrowReceiptBookEntity> entities = new ArrayList<>();
        for (Long id : borrowReceiptBookIds) {
            entities.add(borrowReceiptBookRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt book with id " + id + " not found")));
        }
        return entities;
    }
}
