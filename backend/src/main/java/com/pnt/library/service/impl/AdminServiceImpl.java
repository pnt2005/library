package com.pnt.library.service.impl;

import com.pnt.library.converter.AdminConverter;
import com.pnt.library.enums.Role;
import com.pnt.library.model.dto.admin.AdminRequestDTO;
import com.pnt.library.model.dto.admin.AdminResponseDTO;
import com.pnt.library.model.entity.AdminEntity;
import com.pnt.library.repository.AdminRepository;
import com.pnt.library.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final AdminRepository adminRepository;
    private final AdminConverter adminConverter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AdminResponseDTO createAdmin(AdminRequestDTO dto) {
        AdminEntity adminEntity = adminConverter.toAdminEntity(dto);
        adminEntity.setRole(Role.ROLE_ADMIN);
        adminEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
        return adminConverter.toAdminDTO(adminRepository.save(adminEntity));
    }
}
