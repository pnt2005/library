package com.pnt.library.controller;

import com.pnt.library.model.dto.reader.ReaderRequestDTO;
import com.pnt.library.model.dto.reader.ReaderResponseDTO;
import com.pnt.library.model.dto.reader.ReaderUpdateDTO;
import com.pnt.library.service.ReaderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/readers")
@RequiredArgsConstructor
public class ReaderController {
    private final ReaderService readerService;

    @GetMapping
    public ResponseEntity<List<ReaderResponseDTO>> getReaders() {
        List<ReaderResponseDTO> readerResponseDTOS = readerService.getReaders();
        if (readerResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(readerResponseDTOS);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReaderResponseDTO> getReaderById(@PathVariable Long id) {
        return ResponseEntity.ok(readerService.getReaderById(id));
    }

    @PostMapping
    public ResponseEntity<ReaderResponseDTO> createReader(@Valid @RequestBody ReaderRequestDTO readerRequestDTO) {
        ReaderResponseDTO readerResponseDTO = readerService.createReader(readerRequestDTO);
        URI location = URI.create("/readers/" + readerResponseDTO.getId());
        return ResponseEntity.created(location).body(readerResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReader(@PathVariable Long id) {
        readerService.deleteReader(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReaderResponseDTO> updateReader(@PathVariable Long id, @Valid @RequestBody ReaderUpdateDTO dto) {
        ReaderResponseDTO readerResponseDTO = readerService.updateReader(id, dto);
        return ResponseEntity.ok(readerResponseDTO);
    }
}
