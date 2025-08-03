package com.pnt.library.converter;

import com.pnt.library.model.dto.purchaseReceiptBook.PurchaseReceiptBookResponseDTO;
import com.pnt.library.model.entity.PurchaseReceiptBookEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PurchaseReceiptBookConverter {
    private final ModelMapper modelMapper;
    private final BookConverter bookConverter;

    public PurchaseReceiptBookResponseDTO toDTO(PurchaseReceiptBookEntity entity) {
        //model mapper
        PurchaseReceiptBookResponseDTO purchaseReceiptBookDTO = modelMapper.map(
                entity,
                PurchaseReceiptBookResponseDTO.class);
        //convert purchase receipt and book
        purchaseReceiptBookDTO.setPurchaseReceiptId(entity.getPurchaseReceipt().getId());
        purchaseReceiptBookDTO.setBook(bookConverter.toBookShortDTO(entity.getBook()));

        return purchaseReceiptBookDTO;
    }
}
