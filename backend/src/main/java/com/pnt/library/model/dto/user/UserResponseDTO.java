package com.pnt.library.model.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    protected Long id;
    protected String username;
    protected String role;
}
