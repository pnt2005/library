package com.pnt.library.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;
    //private String refreshToken;
    private String username;
    private String role;
    private Long userId;
}
