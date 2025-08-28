package com.pnt.library.controller;

import com.pnt.library.enums.PurchaseReceiptStatus;
import com.pnt.library.service.PurchaseReceiptService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook")
public class StripeWebhookController {
    private String endpointSecret = "sk_test_51S029qFZzQxfehlU0IvD9uzeHlWmCaHSDj8v3UK1jfGWh1uVYDK5WQYNU8iJPoyapqbadhAHYpITnlCe0mFR4VXv00xx6qnp8A"; // secret lấy từ Stripe dashboard khi tạo webhook

    private final PurchaseReceiptService purchaseReceiptService;

    public StripeWebhookController(PurchaseReceiptService purchaseReceiptService) {
        this.purchaseReceiptService = purchaseReceiptService;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeEvent(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        Event event;

        try {
            // Xác minh event từ Stripe
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        // Xử lý sự kiện
        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer()
                    .getObject()
                    .orElse(null);

            if (session != null) {
                Long receiptId = Long.valueOf(session.getMetadata().get("receiptId"));

                //Cập nhật đơn hàng sang PAID
                purchaseReceiptService.updateStatus(receiptId, PurchaseReceiptStatus.PAID);
            }
        } else if ("payment_failed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer()
                    .getObject()
                    .orElse(null);

            if (session != null) {
                Long receiptId = Long.valueOf(session.getMetadata().get("receiptId"));

                //Cập nhật đơn hàng sang FAILED
                purchaseReceiptService.updateStatus(receiptId, PurchaseReceiptStatus.FAILED);
            }
        }

        return ResponseEntity.ok("Success");
    }
}
