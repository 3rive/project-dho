package com.devsuperior.dsvendas.dto;

import java.io.Serializable;

import com.devsuperior.dsvendas.entities.Seller;

public class SellerDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String location;
    private String address;
    private String phoneNumber;
    private Double totalSales;

    public SellerDTO() {
    }

    public SellerDTO(Long id, String name, String location, String address, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public SellerDTO(Seller entity) {
        id = entity.getId();
        name = entity.getName();
        location = entity.getLocation();
        address = entity.getAddress();
        phoneNumber = entity.getPhonenumber();
    }

    public SellerDTO(Long id, String name, Double totalSales) {
        this.id = id;
        this.name = name;
        this.totalSales = totalSales;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(Double totalSales) {
        this.totalSales = totalSales;
    }
}