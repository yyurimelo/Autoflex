package dev.java.Autoflex.dto;

import java.math.BigDecimal;

public class ProductionSuggestionResponse {
    private Long productId;
    private String productName;
    private Integer producibleQuantity;
    private BigDecimal unitCost;
    private String limitingMaterial;
    private BigDecimal finalPrice;

    public ProductionSuggestionResponse() {
    }

    public ProductionSuggestionResponse(Long productId, String productName, Integer producibleQuantity, BigDecimal unitCost, String limitingMaterial, BigDecimal finalPrice) {
        this.productId = productId;
        this.productName = productName;
        this.producibleQuantity = producibleQuantity;
        this.unitCost = unitCost;
        this.limitingMaterial = limitingMaterial;
        this.finalPrice = finalPrice;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProducibleQuantity() {
        return producibleQuantity;
    }

    public void setProducibleQuantity(Integer producibleQuantity) {
        this.producibleQuantity = producibleQuantity;
    }

    public BigDecimal getUnitCost() {
        return unitCost;
    }

    public void setUnitCost(BigDecimal unitCost) {
        this.unitCost = unitCost;
    }

    public String getLimitingMaterial() {
        return limitingMaterial;
    }

    public void setLimitingMaterial(String limitingMaterial) {
        this.limitingMaterial = limitingMaterial;
    }

    public BigDecimal getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(BigDecimal finalPrice) {
        this.finalPrice = finalPrice;
    }
}