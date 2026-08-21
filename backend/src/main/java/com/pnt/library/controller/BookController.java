package com.pnt.library.controller;

import com.pnt.library.model.dto.book.BookRequestDTO;
import com.pnt.library.model.dto.book.BookResponseDTO;
import com.pnt.library.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<Page<BookResponseDTO>> getBooks(
            @RequestParam Map<String, String> params) {
        Page<BookResponseDTO> books = bookService.getBooks(params);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponseDTO> getBookById(@PathVariable Long id) {
        BookResponseDTO book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @PostMapping
    public ResponseEntity<BookResponseDTO> createBook(@Valid @RequestBody BookRequestDTO bookRequestDTO) {
        BookResponseDTO bookResponseDTO = bookService.createBook(bookRequestDTO);
        URI location = URI.create("/books/" + bookResponseDTO.getId());
        return ResponseEntity.created(location).body(bookResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponseDTO> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDTO bookRequestDTO) {
        BookResponseDTO bookResponseDTO = bookService.updateBook(id, bookRequestDTO);
        return ResponseEntity.ok(bookResponseDTO);
    }
}
