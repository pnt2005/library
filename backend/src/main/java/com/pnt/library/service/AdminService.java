package com.pnt.library.service;

import com.pnt.library.model.dto.admin.AdminRequestDTO;
import com.pnt.library.model.dto.admin.AdminResponseDTO;

public interface AdminService {
    AdminResponseDTO createAdmin(AdminRequestDTO admin);
}
