package com.pnt.library.model.dto.reader;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReaderUpdateDTO {
    @NotBlank(message = "Email is required")
    protected String email;
    @NotBlank(message = "Birthday is required")
    protected String birthday;
    @NotBlank(message = "Phone number is required")
    protected String phoneNumber;
    @NotBlank(message = "Address is required")
    protected String address;
}
