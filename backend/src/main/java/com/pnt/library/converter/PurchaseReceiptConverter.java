package com.pnt.library.converter;

import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptRequestDTO;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptResponseDTO;
import com.pnt.library.model.dto.purchaseReceiptBook.PurchaseReceiptBookResponseDTO;
import com.pnt.library.model.entity.PurchaseReceiptBookEntity;
import com.pnt.library.model.entity.PurchaseReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class PurchaseReceiptConverter {
    private final ModelMapper modelMapper;
    private final PurchaseReceiptBookConverter purchaseReceiptBookConverter;
    private final ReaderConverter readerConverter;

    public PurchaseReceiptResponseDTO toPurchaseReceiptDTO(PurchaseReceiptEntity purchaseReceiptEntity) {
        //model mapper
        PurchaseReceiptResponseDTO purchaseReceiptResponseDTO = modelMapper.map(
                purchaseReceiptEntity,
                PurchaseReceiptResponseDTO.class);

        //convert reader entity to reader short dto
        purchaseReceiptResponseDTO.setReader(readerConverter.toReaderShortDTO(purchaseReceiptEntity.getReader()));

        //convert purchase book entity to purchase book dto
        List<PurchaseReceiptBookResponseDTO> purchaseReceiptBooks = new ArrayList<>();
        for (PurchaseReceiptBookEntity purchaseReceiptBook : purchaseReceiptEntity.getPurchaseReceiptBooks()) {
            purchaseReceiptBooks.add(purchaseReceiptBookConverter.toDTO(purchaseReceiptBook));
        }
        purchaseReceiptResponseDTO.setPurchaseReceiptBooks(purchaseReceiptBooks);

        return purchaseReceiptResponseDTO;
    }

    public PurchaseReceiptEntity toPurchaseReceiptEntity(PurchaseReceiptRequestDTO dto,
                                                         ReaderEntity reader) {
        PurchaseReceiptEntity entity = new PurchaseReceiptEntity();
        entity.setReader(reader);
        return entity;
    }
}
