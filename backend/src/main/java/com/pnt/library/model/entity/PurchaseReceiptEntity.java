package com.pnt.library.model.entity;

import com.pnt.library.enums.PurchaseReceiptStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "purchase_receipt")
public class PurchaseReceiptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reader_id")
    private ReaderEntity reader;

    @OneToMany(mappedBy = "purchaseReceipt", cascade = CascadeType.ALL)
    private List<PurchaseReceiptBookEntity> purchaseReceiptBooks = new ArrayList<>();

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PurchaseReceiptStatus status;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

}
