package com.pnt.library.repository;

import com.pnt.library.enums.BorrowReceiptStatus;
import com.pnt.library.model.entity.BorrowReceiptEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BorrowReceiptRepository extends JpaRepository<BorrowReceiptEntity, Long>, JpaSpecificationExecutor<BorrowReceiptEntity> {
    List<BorrowReceiptEntity> findAll(Specification<BorrowReceiptEntity> specification);

    List<BorrowReceiptEntity> findAllByStatus(BorrowReceiptStatus status);

    @Query("SELECT DATE(br.borrowDate), COUNT(br), SUM(br.totalPrice) " +
            "FROM BorrowReceiptEntity br " +
            "GROUP BY DATE(br.borrowDate) " +
            "ORDER BY DATE(br.borrowDate)")
    List<Object[]> countReceiptsAndTotalPriceByDay();
}
