package com.pnt.library.model.dto.book;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BookResponseDTO {
    private Long id;
    private String name;
    private String author;
    private String description;
    private String isbn;
    private String publisher;
    private String image;
    private String category;
    private Long year;
    private Long quantity;
    private BigDecimal price;
    private List<Long> borrowReceiptBookIds;
}