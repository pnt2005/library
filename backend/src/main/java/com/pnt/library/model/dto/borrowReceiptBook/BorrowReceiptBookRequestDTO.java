package com.pnt.library.model.dto.borrowReceiptBook;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowReceiptBookRequestDTO {
    private Long bookId;
    private Long quantity;
}
