package com.pnt.library.converter;

import com.pnt.library.model.dto.admin.AdminRequestDTO;
import com.pnt.library.model.dto.admin.AdminResponseDTO;
import com.pnt.library.model.entity.AdminEntity;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminConverter {
    private final ModelMapper modelMapper;

    public AdminResponseDTO toAdminDTO(AdminEntity adminEntity) {
        return modelMapper.map(adminEntity, AdminResponseDTO.class);
    }

    public AdminEntity toAdminEntity(AdminRequestDTO dto) {
        return modelMapper.map(dto, AdminEntity.class);
    }
}
