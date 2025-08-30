package com.pnt.library.service;

import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptRequestDTO;
import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptResponseDTO;

import java.util.List;
import java.util.Map;

public interface BorrowReceiptService {
    List<BorrowReceiptResponseDTO> getBorrowReceipts(Map<String, String> params);

    BorrowReceiptResponseDTO getBorrowReceiptById(Long id);

    BorrowReceiptResponseDTO createBorrowReceipt(BorrowReceiptRequestDTO borrowReceiptRequestDTO);

    void deleteBorrowReceipt(Long id);

    BorrowReceiptResponseDTO returnBorrowReceipt(Long id);

    BorrowReceiptResponseDTO renewBorrowReceipt(Long id);

    List<Map<String, Object>> getDailyStats();
    
}
