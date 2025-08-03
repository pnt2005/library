package com.pnt.library.model.dto.purchaseReceiptBook;

import com.pnt.library.model.dto.book.BookShortDTO;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PurchaseReceiptBookResponseDTO {
    private Long id;
    private Long purchaseReceiptId;
    private BookShortDTO book;
    private Long quantity;
    private BigDecimal price;
}
