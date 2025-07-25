package com.pnt.library.model.dto.borrowReceipt;

import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookRequestDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BorrowReceiptRequestDTO {
    private List<BorrowReceiptBookRequestDTO> books;

    @NotNull(message = "ReaderId is required")
    private Long readerId;

}
