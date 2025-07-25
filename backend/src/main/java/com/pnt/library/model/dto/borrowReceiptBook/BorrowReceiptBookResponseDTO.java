package com.pnt.library.model.dto.borrowReceiptBook;

import com.pnt.library.model.dto.book.BookShortDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BorrowReceiptBookResponseDTO {
    private Long id;
    private Long borrowReceiptId;
    private BookShortDTO book;
    private Long quantity;
}
