package com.pnt.library.model.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {
    @NotBlank(message = "Username is required")
    protected String username;
    @NotBlank(message = "Password is required")
    protected String password;
}
