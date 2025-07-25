package com.pnt.library.model.dto.borrowReceipt;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pnt.library.enums.BorrowReceiptStatus;
import com.pnt.library.model.dto.borrowReceiptBook.BorrowReceiptBookResponseDTO;
import com.pnt.library.model.dto.reader.ReaderShortDTO;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BorrowReceiptResponseDTO {
    private String id;
    private List<BorrowReceiptBookResponseDTO> borrowReceiptBooks;
    private ReaderShortDTO reader;
    private BorrowReceiptStatus status;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime borrowDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime returnDate;
}
