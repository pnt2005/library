package com.pnt.library.controller;

import com.pnt.library.model.dto.admin.AdminRequestDTO;
import com.pnt.library.model.dto.admin.AdminResponseDTO;
import com.pnt.library.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminResponseDTO> createAdmin(@Valid @RequestBody AdminRequestDTO dto) {
        AdminResponseDTO adminResponseDTO = adminService.createAdmin(dto);
        URI location = URI.create("/admin/");
        return ResponseEntity.created(location).body(adminResponseDTO);
    }
}
