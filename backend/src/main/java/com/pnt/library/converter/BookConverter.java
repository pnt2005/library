package com.pnt.library.converter;

import com.pnt.library.model.dto.book.BookRequestDTO;
import com.pnt.library.model.dto.book.BookResponseDTO;
import com.pnt.library.model.dto.book.BookShortDTO;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BookConverter {
    private final ModelMapper modelMapper;

    public BookResponseDTO toBookDTO(BookEntity bookEntity) {
        BookResponseDTO bookResponseDTO = modelMapper.map(bookEntity, BookResponseDTO.class);
        //convert borrow receipt entity to id
        List<Long> borrowReceiptBookIds = new ArrayList<>();
        for (BorrowReceiptBookEntity borrowReceiptBook : bookEntity.getBorrowReceiptBooks()) {
            borrowReceiptBookIds.add(borrowReceiptBook.getId());
        }
        bookResponseDTO.setBorrowReceiptBookIds(borrowReceiptBookIds);

        return bookResponseDTO;
    }

    public BookEntity toBookEntity(BookRequestDTO dto) {
        return modelMapper.map(dto, BookEntity.class);
    }

    public void updateBookEntity(BookRequestDTO dto,
                                 BookEntity entity,
                                 List<BorrowReceiptBookEntity> borrowReceiptBookEntities) {
        modelMapper.map(dto, entity);
        entity.setBorrowReceiptBooks(borrowReceiptBookEntities);
    }

    public BookShortDTO toBookShortDTO(BookEntity bookEntity) {
        return modelMapper.map(bookEntity, BookShortDTO.class);
    }
}
