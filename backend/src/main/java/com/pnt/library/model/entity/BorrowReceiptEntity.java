package com.pnt.library.model.entity;

import com.pnt.library.enums.BorrowReceiptStatus;
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
@Table(name = "borrow_receipt")
public class BorrowReceiptEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "borrowReceipt", cascade = CascadeType.ALL)
    private List<BorrowReceiptBookEntity> borrowReceiptBooks = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "reader_id")
    private ReaderEntity readerEntity;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private BorrowReceiptStatus status;

    @Column(name = "borrow_date")
    private LocalDateTime borrowDate;

    @Column(name = "return_date")
    private LocalDateTime returnDate;

    @Column(name = "total_price")
    private BigDecimal totalPrice;
}
