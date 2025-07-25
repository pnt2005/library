package com.pnt.library.repository;

import com.pnt.library.model.entity.ReaderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReaderRepository extends JpaRepository<ReaderEntity, Long> {
    boolean existsByUsername(String username);
}
