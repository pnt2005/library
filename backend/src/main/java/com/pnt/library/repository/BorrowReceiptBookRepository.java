package com.pnt.library.repository;

import com.pnt.library.model.entity.BorrowReceiptBookEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BorrowReceiptBookRepository extends JpaRepository<BorrowReceiptBookEntity, Long> {
    
}
