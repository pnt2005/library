package com.pnt.library.converter;

import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookRequestDTO;
import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookResponseDTO;
import com.pnt.library.model.entity.BookEntity;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BorrowReceiptBookConverter {
    private final ModelMapper modelMapper;
    private final BookConverter bookConverter;
    
    public BorrowReceiptBookResponseDTO toDTO(BorrowReceiptBookEntity entity) {
        //model mapper
        BorrowReceiptBookResponseDTO borrowReceiptBookDTO = modelMapper.map(
                entity,
                BorrowReceiptBookResponseDTO.class);
        //convert borrow receipt and book
        borrowReceiptBookDTO.setBorrowReceiptId(entity.getBorrowReceipt().getId());
        borrowReceiptBookDTO.setBook(bookConverter.toBookShortDTO(entity.getBook()));

        return borrowReceiptBookDTO;
    }

    public BorrowReceiptBookEntity toEntity(BorrowReceiptBookRequestDTO dto,
                                            BorrowReceiptEntity borrowReceipt,
                                            BookEntity book) {
        BorrowReceiptBookEntity entity = new BorrowReceiptBookEntity();
        entity.setQuantity(dto.getQuantity());
        entity.setBorrowReceipt(borrowReceipt);
        entity.setBook(book);
        return entity;
    }
}
