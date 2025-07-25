package com.pnt.library.model.dto.reader;

import com.pnt.library.model.dto.user.UserRequestDTO;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReaderRequestDTO extends UserRequestDTO {
    @NotBlank(message = "Email is required")
    protected String email;
    @NotBlank(message = "Birthday is required")
    protected String birthday;
    @NotBlank(message = "Phone number is required")
    protected String phoneNumber;
    @NotBlank(message = "Address is required")
    protected String address;
    
    private List<Long> borrowReceiptIDs;
}
