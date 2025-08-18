package com.pnt.library.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "book")
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "image")
    private String image;

    @Column(name = "category")
    private String category;

    @Column(name = "year")
    private Long year;

    @Column(name = "quantity")
    private Long quantity;

    @OneToMany(mappedBy = "book")
    private List<BorrowReceiptBookEntity> borrowReceiptBooks = new ArrayList<>();

    @Column(name = "borrow_price")
    private BigDecimal borrowPrice;

    @Column(name = "purchase_price")
    private BigDecimal purchasePrice;
}
