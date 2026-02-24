package dev.java.Autoflex.dto;

import jakarta.validation.constraints.NotNull;

public class CreateUpdateRawMaterialRequest {

    @NotNull
    private String name;

    @NotNull
    private Integer stockQuantity;

    public CreateUpdateRawMaterialRequest() {}

    public CreateUpdateRawMaterialRequest(@NotNull String name, @NotNull Integer stockQuantity) {
        this.name = name;
        this.stockQuantity = stockQuantity;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public String getName() {
        return name;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }
}