package com.pnt.library.controller;

import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptRequestDTO;
import com.pnt.library.model.dto.purchaseReceipt.PurchaseReceiptResponseDTO;
import com.pnt.library.service.PurchaseReceiptService;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/checkout")
@RequiredArgsConstructor
public class CheckoutController {
    private final PurchaseReceiptService purchaseReceiptService;

    @PostMapping
    public Map<String, Object> createCheckoutSession(@RequestBody PurchaseReceiptRequestDTO request) throws StripeException {
        PurchaseReceiptResponseDTO receipt = purchaseReceiptService.createPurchaseReceipt(request);

        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/receipts/purchase/" + receipt.getId() + "?check=1")
                .setCancelUrl("http://localhost:3000/cart")
                .putMetadata("receiptId", receipt.getId());

        // Lặp qua từng sách trong purchaseReceiptBooks để add line item
        receipt.getPurchaseReceiptBooks().forEach(item -> {
            SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                            .setQuantity(item.getQuantity().longValue())
                            .setPriceData(
                                    SessionCreateParams.LineItem.PriceData.builder()
                                            .setCurrency("usd")
                                            .setUnitAmount(item.getBook().getPurchasePrice().multiply(BigDecimal.valueOf(100)).longValue())
                                            .setProductData(
                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                            .setName(item.getBook().getName()) // tên sách
                                                            .setDescription("Author: " + item.getBook().getAuthor()) // hiện tác giả
                                                            .addImage(item.getBook().getImage()) // hiện ảnh (URL)
                                                            .build()
                                            )
                                            .build()
                            )
                            .build();
            paramsBuilder.addLineItem(lineItem);
        });


        Session session = Session.create(paramsBuilder.build());

        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", session.getId());
        response.put("receiptId", receipt.getId());
        return response;
    }

}
