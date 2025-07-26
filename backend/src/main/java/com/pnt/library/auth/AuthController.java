package com.pnt.library.auth;

import com.pnt.library.model.dto.reader.ReaderRequestDTO;
import com.pnt.library.model.dto.reader.ReaderResponseDTO;
import com.pnt.library.model.dto.user.UserResponseDTO;
import com.pnt.library.model.entity.UserEntity;
import com.pnt.library.service.ReaderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final ReaderService readerService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        //authenticate username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        //get user detail
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        //create jwt
        String accessToken = jwtService.generateToken(userDetails.getUser());
        String refreshToken = jwtService.generateRefreshToken(userDetails.getUser());
        return ResponseEntity.ok(new JwtResponse(
                accessToken,
                refreshToken,
                userDetails.getUsername(),
                userDetails.getUser().getRole().name(),
                userDetails.getUser().getId()));
    }

    @PostMapping("/register")
    public ResponseEntity<ReaderResponseDTO> createReader(@Valid @RequestBody ReaderRequestDTO readerRequestDTO) {
        ReaderResponseDTO readerResponseDTO = readerService.createReader(readerRequestDTO);
        URI location = URI.create("/readers/" + readerResponseDTO.getId());
        return ResponseEntity.created(location).body(readerResponseDTO);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        UserEntity user = userDetails.getUser();

        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setUsername(user.getUsername());
        userResponseDTO.setId(user.getId());
        userResponseDTO.setRole(String.valueOf(user.getRole()));
        return ResponseEntity.ok(userResponseDTO);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshRequest request) {
        String refreshToken = request.getRefreshToken();

        if (!jwtService.validateRefreshToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = jwtService.extractUsername(refreshToken);
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        UserEntity user = ((CustomUserDetails) userDetails).getUser();

        String newAccessToken = jwtService.generateToken(user);
        return ResponseEntity.ok(new JwtResponse(newAccessToken, refreshToken, username, user.getRole().name(), user.getId()));
    }
}
