package com.pnt.library.model.dto.book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BookRequestDTO {
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Author is required")
    private String author;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "ISBN is required")
    private String isbn;
    @NotBlank(message = "Publisher is required")
    private String publisher;
    @NotBlank(message = "Image is required")
    private String image;
    @NotBlank(message = "Category is required")
    private String category;
    @NotNull(message = "Year is required")
    private Long year;
    @NotNull(message = "Quantity is required")
    private Long quantity;
    @NotNull(message = "Price is required")
    private BigDecimal price;

    private List<Long> borrowReceiptBookIds;
}
