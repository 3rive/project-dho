package com.devsuperior.dsvendas.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_sellers")
public class Seller {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String location;
	private String address;
	private String phonenumber;

	public void setPhonenumber(String phonenumber) {
		this.phonenumber = phonenumber;
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
	public String getPhonenumber() {
		return phonenumber;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy = "seller")
	private List<Sale> sales = new ArrayList<>();
	
	public Seller () {	
	}

	public Seller(Long id, String name) {
		this.id = id;
		this.name = name;
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

	public List<Sale> getSales() {
		return sales;
	}	

    public String getPhoneNumber() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}
