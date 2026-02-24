package dev.java.Autoflex.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;

public class CreateUpdateProductRequest {

    @NotNull
    private String name;

    @NotNull
    private BigDecimal price;

    public CreateUpdateProductRequest() {}

    public CreateUpdateProductRequest(@NotNull String name, @NotNull BigDecimal price) {
        this.name = name;
        this.price = price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getPrice() {
        return price;
    }
}
