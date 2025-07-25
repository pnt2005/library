package com.pnt.library.model.dto.reader;

import com.pnt.library.model.dto.user.UserResponseDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReaderResponseDTO extends UserResponseDTO {
    protected String email;
    protected String birthday;
    protected String phoneNumber;
    protected String address;
    private List<Long> borrowReceiptIDs;
}
