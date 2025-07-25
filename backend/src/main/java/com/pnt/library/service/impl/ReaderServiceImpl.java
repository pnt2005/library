package com.pnt.library.service.impl;

import com.pnt.library.converter.ReaderConverter;
import com.pnt.library.enums.Role;
import com.pnt.library.exception.ResourceNotFoundException;
import com.pnt.library.model.dto.reader.ReaderRequestDTO;
import com.pnt.library.model.dto.reader.ReaderResponseDTO;
import com.pnt.library.model.dto.reader.ReaderUpdateDTO;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import com.pnt.library.model.entity.ReaderEntity;
import com.pnt.library.repository.BorrowReceiptRepository;
import com.pnt.library.repository.ReaderRepository;
import com.pnt.library.service.ReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {
    private final ReaderRepository readerRepository;
    private final BorrowReceiptRepository borrowReceiptRepository;
    private final ReaderConverter readerConverter;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<ReaderResponseDTO> getReaders() {
        List<ReaderResponseDTO> readerResponseDTOS = new ArrayList<>();
        List<ReaderEntity> readerEntities = readerRepository.findAll();
        for (ReaderEntity readerEntity : readerEntities) {
            readerResponseDTOS.add(readerConverter.toReaderDTO(readerEntity));
        }
        return readerResponseDTOS;
    }

    @Override
    public ReaderResponseDTO getReaderById(Long id) {
        ReaderEntity readerEntity = findReaderById(id);
        return readerConverter.toReaderDTO(readerEntity);
    }

    @Override
    public ReaderResponseDTO createReader(ReaderRequestDTO dto) {
        if (readerRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        ReaderEntity readerEntity = readerConverter.toReaderEntity(dto);
        readerEntity.setPassword(passwordEncoder.encode(dto.getPassword()));
        readerEntity.setRole(Role.ROLE_READER);
        return readerConverter.toReaderDTO(readerRepository.save(readerEntity));
    }

    @Override
    public ReaderResponseDTO updateReader(Long id, ReaderUpdateDTO dto) {
        ReaderEntity readerEntity = findReaderById(id);
        readerConverter.updateReaderEntity(dto, readerEntity);
        return readerConverter.toReaderDTO(readerRepository.save(readerEntity));
    }

    @Override
    public void deleteReader(Long id) {
        ReaderEntity readerEntity = findReaderById(id);
        for (BorrowReceiptEntity borrowReceiptEntity : readerEntity.getBorrowReceiptEntities()) {
            borrowReceiptRepository.delete(borrowReceiptEntity);
        }
        readerRepository.delete(readerEntity);
    }

    private ReaderEntity findReaderById(Long id) {
        return readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader with id " + id + " not found"));
    }

    private List<BorrowReceiptEntity> findBorrowReceiptsByIds(List<Long> borrowReceiptIds) {
        List<BorrowReceiptEntity> borrowReceiptEntities = new ArrayList<>();
        for (Long id : borrowReceiptIds) {
            borrowReceiptEntities.add(borrowReceiptRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Borrow receipt with id " + id + " not found")));
        }
        return borrowReceiptEntities;
    }
}
