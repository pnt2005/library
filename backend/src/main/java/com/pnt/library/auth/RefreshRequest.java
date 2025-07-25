package com.pnt.library.auth;

import lombok.Data;

@Data
public class RefreshRequest {
    private String refreshToken;
}
