package com.pnt.library.service;

import com.pnt.library.model.dto.book.BookRequestDTO;
import com.pnt.library.model.dto.book.BookResponseDTO;

import java.util.List;
import java.util.Map;

public interface BookService {
    List<BookResponseDTO> getBooks(Map<String, String> params);

    BookResponseDTO getBookById(Long id);

    BookResponseDTO createBook(BookRequestDTO bookRequestDTO);

    void deleteBook(Long id);

    BookResponseDTO updateBook(Long id, BookRequestDTO bookRequestDTO);

}
