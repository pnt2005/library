package com.pnt.library.converter;

import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptRequestDTO;
import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptResponseDTO;
import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookResponseDTO;
import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class BorrowReceiptConverter {
    private final ModelMapper modelMapper;
    private final BorrowReceiptBookConverter borrowReceiptBookConverter;
    private final ReaderConverter readerConverter;

    public BorrowReceiptResponseDTO toBorrowReceiptDTO(BorrowReceiptEntity borrowReceiptEntity) {
        //model mapper
        BorrowReceiptResponseDTO borrowReceiptResponseDTO = modelMapper.map(
                borrowReceiptEntity,
                BorrowReceiptResponseDTO.class);

        //convert reader entity to reader short dto
        borrowReceiptResponseDTO.setReader(readerConverter.toReaderShortDTO(borrowReceiptEntity.getReaderEntity()));

        //convert borrow book entity to borrow book dto
        List<BorrowReceiptBookResponseDTO> borrowReceiptBooks = new ArrayList<>();
        for (BorrowReceiptBookEntity borrowReceiptBook : borrowReceiptEntity.getBorrowReceiptBooks()) {
            borrowReceiptBooks.add(borrowReceiptBookConverter.toDTO(borrowReceiptBook));
        }
        borrowReceiptResponseDTO.setBorrowReceiptBooks(borrowReceiptBooks);

        return borrowReceiptResponseDTO;
    }

    public BorrowReceiptEntity toBorrowReceiptEntity(BorrowReceiptRequestDTO dto,
                                                     ReaderEntity reader) {
        BorrowReceiptEntity entity = new BorrowReceiptEntity();
        entity.setReaderEntity(reader);
        return entity;
    }

    public void updateBorrowReceiptEntity(BorrowReceiptRequestDTO dto,
                                          BorrowReceiptEntity entity,
                                          ReaderEntity reader,
                                          List<BorrowReceiptBookEntity> borrowReceiptBooks) {
        modelMapper.map(dto, entity);
        entity.setReaderEntity(reader);
        entity.setBorrowReceiptBooks(borrowReceiptBooks);
    }
}
