package com.pnt.library.model.dto.book;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BookShortDTO {
    private Long id;
    private String name;
    private String author;
    private String publisher;
    private String image;
    private String category;
    private Long year;
    private Long quantity;
    private BigDecimal borrowPrice;
    private BigDecimal purchasePrice;
}
