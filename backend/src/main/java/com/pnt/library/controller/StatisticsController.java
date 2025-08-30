package com.pnt.library.controller;

import com.pnt.library.service.BookService;
import com.pnt.library.service.BorrowReceiptService;
import com.pnt.library.service.PurchaseReceiptService;
import com.pnt.library.service.ReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final BookService bookService;
    private final ReaderService userService;
    private final BorrowReceiptService borrowReceiptService;
    private final PurchaseReceiptService purchaseReceiptService;

    @GetMapping
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        Map<String, String> params = new HashMap<>();

        stats.put("totalBooks", bookService.getBooks(params).size());
        stats.put("totalUsers", userService.getReaders().size() - 1);
        stats.put("totalBorrowReceipts", borrowReceiptService.getBorrowReceipts(params).size());
        stats.put("totalPurchaseReceipts", purchaseReceiptService.getPurchaseReceipts(params).size());

        return stats;
    }

    @GetMapping("/purchase")
    public List<Map<String, Object>> getPurchaseDailyStats() {
        return purchaseReceiptService.getDailyStats();
    }

    @GetMapping("/borrow")
    public List<Map<String, Object>> getBorrowDailyStats() {
        return borrowReceiptService.getDailyStats();
    }
}
