package com.pnt.library.model.dto.purchaseReceipt;

import com.pnt.library.model.dto.purchaseReceiptBook.PurchaseReceiptBookRequestDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PurchaseReceiptRequestDTO {
    private List<PurchaseReceiptBookRequestDTO> books;

    @NotNull(message = "ReaderId is required")
    private Long readerId;
}
