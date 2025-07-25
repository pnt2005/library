package com.pnt.library.repository;

import com.pnt.library.enums.BorrowReceiptStatus;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface BorrowReceiptRepository extends JpaRepository<BorrowReceiptEntity, Long>, JpaSpecificationExecutor<BorrowReceiptEntity> {
    List<BorrowReceiptEntity> findAll(Specification<BorrowReceiptEntity> specification);

    List<BorrowReceiptEntity> findAllByStatus(BorrowReceiptStatus status);
}
