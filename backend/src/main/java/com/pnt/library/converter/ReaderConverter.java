package com.pnt.library.converter;

import com.pnt.library.model.dto.reader.ReaderRequestDTO;
import com.pnt.library.model.dto.reader.ReaderResponseDTO;
import com.pnt.library.model.dto.reader.ReaderShortDTO;
import com.pnt.library.model.dto.reader.ReaderUpdateDTO;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReaderConverter {
    private final ModelMapper modelMapper;

    public ReaderResponseDTO toReaderDTO(ReaderEntity readerEntity) {
        ReaderResponseDTO readerResponseDTO = modelMapper.map(readerEntity, ReaderResponseDTO.class);
        List<Long> borrowReceiptsIDs = new ArrayList<>();
        for (BorrowReceiptEntity borrowReceiptEntity : readerEntity.getBorrowReceiptEntities()) {
            borrowReceiptsIDs.add((borrowReceiptEntity.getId()));
        }
        readerResponseDTO.setBorrowReceiptIDs(borrowReceiptsIDs);
        return readerResponseDTO;
    }

    public ReaderEntity toReaderEntity(ReaderRequestDTO dto) {
        return modelMapper.map(dto, ReaderEntity.class);
    }

    public void updateReaderEntity(ReaderUpdateDTO dto, ReaderEntity entity) {
        modelMapper.map(dto, entity);
    }

    public ReaderShortDTO toReaderShortDTO(ReaderEntity entity) {
        return modelMapper.map(entity, ReaderShortDTO.class);
    }
}
