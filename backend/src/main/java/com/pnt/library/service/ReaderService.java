package com.pnt.library.service;

import com.pnt.library.model.dto.reader.ReaderRequestDTO;
import com.pnt.library.model.dto.reader.ReaderResponseDTO;
import com.pnt.library.model.dto.reader.ReaderUpdateDTO;

import java.util.List;

public interface ReaderService {
    List<ReaderResponseDTO> getReaders();

    ReaderResponseDTO getReaderById(Long id);

    ReaderResponseDTO createReader(ReaderRequestDTO reader);

    ReaderResponseDTO updateReader(Long id, ReaderUpdateDTO reader);

    void deleteReader(Long id);
}
