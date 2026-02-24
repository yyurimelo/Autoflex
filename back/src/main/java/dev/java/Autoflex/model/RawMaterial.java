package dev.java.Autoflex.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "raw_materials")
public class RawMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    public RawMaterial() {}

    public RawMaterial(Long id, String name, Integer stockQuantity) {
        this.id = id;
        this.name = name;
        this.stockQuantity = stockQuantity;
    }
    
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }
}