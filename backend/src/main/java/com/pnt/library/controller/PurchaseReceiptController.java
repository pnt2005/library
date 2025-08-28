package com.pnt.library.controller;

import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptRequestDTO;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptResponseDTO;
import com.pnt.library.service.PurchaseReceiptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/purchase-receipts")
@RequiredArgsConstructor
public class PurchaseReceiptController {
    private final PurchaseReceiptService purchaseReceiptService;

    @GetMapping
    public ResponseEntity<List<PurchaseReceiptResponseDTO>> getPurchaseReceipts(
            @RequestParam Map<String, String> params) {
        List<PurchaseReceiptResponseDTO> purchaseReceiptResponseDTOS =
                purchaseReceiptService.getPurchaseReceipts(params);
        if (purchaseReceiptResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(purchaseReceiptResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseReceiptResponseDTO> getPurchaseReceiptById(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseReceiptService.getPurchaseReceiptById(id));
    }

    @PostMapping
    public ResponseEntity<PurchaseReceiptResponseDTO> createPurchaseReceipt(@Valid @RequestBody PurchaseReceiptRequestDTO purchaseReceiptRequestDTO) {
        PurchaseReceiptResponseDTO purchaseReceiptResponseDTO = purchaseReceiptService.createPurchaseReceipt(purchaseReceiptRequestDTO);
        URI location = URI.create("/purchase-receipts/" + purchaseReceiptResponseDTO.getId());
        return ResponseEntity.created(location).body(purchaseReceiptResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseReceipt(@PathVariable Long id) {
        purchaseReceiptService.deletePurchaseReceipt(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/receive")
    public ResponseEntity<PurchaseReceiptResponseDTO> receivePurchaseReceipt(@PathVariable Long id) {
        PurchaseReceiptResponseDTO purchaseReceiptResponseDTO = purchaseReceiptService.receivePurchaseReceipt(id);
        URI location = URI.create("/purchase-receipts/" + purchaseReceiptResponseDTO.getId());
        return ResponseEntity.created(location).body(purchaseReceiptResponseDTO);
    }
}
