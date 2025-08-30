package com.pnt.library.repository;

import com.pnt.library.enums.PurchaseReceiptStatus;
import com.pnt.library.model.entity.PurchaseReceiptEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseReceiptRepository extends JpaRepository<PurchaseReceiptEntity, Long>, JpaSpecificationExecutor<PurchaseReceiptEntity> {
    List<PurchaseReceiptEntity> findAll(Specification<PurchaseReceiptEntity> specification);

    List<PurchaseReceiptEntity> findAllByStatus(PurchaseReceiptStatus status);

    @Query("SELECT DATE(pr.createDate), COUNT(pr), SUM(pr.totalPrice) " +
            "FROM PurchaseReceiptEntity pr " +
            "GROUP BY DATE(pr.createDate) " +
            "ORDER BY DATE(pr.createDate)")
    List<Object[]> countReceiptsAndTotalPriceByDay();
}

