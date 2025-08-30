package com.pnt.library.service;

import com.pnt.library.enums.PurchaseReceiptStatus;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptRequestDTO;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptResponseDTO;

import java.util.List;
import java.util.Map;

public interface PurchaseReceiptService {
    List<PurchaseReceiptResponseDTO> getPurchaseReceipts(Map<String, String> params);

    PurchaseReceiptResponseDTO getPurchaseReceiptById(Long id);

    PurchaseReceiptResponseDTO createPurchaseReceipt(PurchaseReceiptRequestDTO PurchaseReceiptRequestDTO);

    void deletePurchaseReceipt(Long id);

    PurchaseReceiptResponseDTO receivePurchaseReceipt(Long id);

    PurchaseReceiptResponseDTO updateStatus(Long id, PurchaseReceiptStatus status);

    List<Map<String, Object>> getDailyStats();
}
