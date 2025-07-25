package com.pnt.library.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reader")
public class ReaderEntity extends UserEntity {
    @Column(name = "email")
    protected String email;

    @Column(name = "birthday")
    protected String birthday;

    @Column(name = "phoneNumber")
    protected String phoneNumber;

    @Column(name = "address")
    protected String address;

    @OneToMany(mappedBy = "readerEntity", cascade = CascadeType.ALL)
    private List<BorrowReceiptEntity> borrowReceiptEntities = new ArrayList<>();
}
