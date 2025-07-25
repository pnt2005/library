package com.pnt.library.service.impl;

import com.pnt.library.converter.BorrowReceiptBookConverter;
import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.repository.BookRepository;
import com.pnt.library.repository.BorrowReceiptBookRepository;
import com.pnt.library.repository.BorrowReceiptRepository;
import com.pnt.library.service.BorrowReceiptBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BorrowReceiptBookServiceImpl implements BorrowReceiptBookService {
    private final BorrowReceiptBookRepository borrowReceiptBookRepository;
    private final BorrowReceiptBookConverter borrowReceiptBookConverter;
    private final BorrowReceiptRepository borrowReceiptRepository;
    private final BookRepository bookRepository;


    @Override
    public void deleteBorrowReceiptBook(Long id) {
        borrowReceiptBookRepository.delete(findBorrowReceiptBookById(id));
    }

    private BookEntity findBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " not found"));
    }

    private BorrowReceiptEntity findBorrowReceiptById(Long id) {
        return borrowReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt with id " + id + " not found"));
    }

    private BorrowReceiptBookEntity findBorrowReceiptBookById(Long id) {
        return borrowReceiptBookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt book with id " + id + " not found"));
    }
}
