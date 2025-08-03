package com.pnt.library.model.dto.purchaseReceipt;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pnt.library.enums.BorrowReceiptStatus;
import com.pnt.library.model.dto.purchaseReceiptBook.PurchaseReceiptBookResponseDTO;
import com.pnt.library.model.dto.reader.ReaderShortDTO;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PurchaseReceiptResponseDTO {
    private String id;
    private List<PurchaseReceiptBookResponseDTO> purchaseReceiptBooks;
    private ReaderShortDTO reader;
    private BorrowReceiptStatus status;
    private BigDecimal totalPrice;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createDate;
}
