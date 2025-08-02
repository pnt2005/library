package com.pnt.library.controller;

import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptRequestDTO;
import com.pnt.library.model.dto.borrowReceipt.BorrowReceiptResponseDTO;
import com.pnt.library.service.BorrowReceiptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/borrow-receipts")
@RequiredArgsConstructor
public class BorrowReceiptController {
    private final BorrowReceiptService borrowReceiptService;

    @GetMapping
    public ResponseEntity<List<BorrowReceiptResponseDTO>> getBorrowReceipts(
            @RequestParam Map<String, String> params) {
        List<BorrowReceiptResponseDTO> borrowReceiptResponseDTOS =
                borrowReceiptService.getBorrowReceipts(params);
        if (borrowReceiptResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(borrowReceiptResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BorrowReceiptResponseDTO> getBorrowReceiptById(@PathVariable Long id) {
        return ResponseEntity.ok(borrowReceiptService.getBorrowReceiptById(id));
    }

    @PostMapping
    public ResponseEntity<BorrowReceiptResponseDTO> createBorrowReceipt(@Valid @RequestBody BorrowReceiptRequestDTO borrowReceiptRequestDTO) {
        BorrowReceiptResponseDTO borrowReceiptResponseDTO = borrowReceiptService.createBorrowReceipt(borrowReceiptRequestDTO);
        URI location = URI.create("/borrow-receipts/" + borrowReceiptResponseDTO.getId());
        return ResponseEntity.created(location).body(borrowReceiptResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBorrowReceipt(@PathVariable Long id) {
        borrowReceiptService.deleteBorrowReceipt(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<BorrowReceiptResponseDTO> acceptBorrowReceipt(@PathVariable Long id) {
        BorrowReceiptResponseDTO responseDTO = borrowReceiptService.acceptBorrowReceipt(id);
        URI location = URI.create("/borrow-receipts/" + responseDTO.getId());
        return ResponseEntity.created(location).body(responseDTO);
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<BorrowReceiptResponseDTO> rejectBorrowReceipt(@PathVariable Long id) {
        BorrowReceiptResponseDTO responseDTO = borrowReceiptService.rejectBorrowReceipt(id);
        URI location = URI.create("/borrow-receipts/" + responseDTO.getId());
        return ResponseEntity.created(location).body(responseDTO);
    }

    @PostMapping("/{id}/return")
    public ResponseEntity<BorrowReceiptResponseDTO> returnBorrowReceipt(@PathVariable Long id) {
        BorrowReceiptResponseDTO responseDTO = borrowReceiptService.returnBorrowReceipt(id);
        URI location = URI.create("/borrow-receipts/" + responseDTO.getId());
        return ResponseEntity.created(location).body(responseDTO);
    }
}
