package dev.java.Autoflex.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CreateUpdateProductRawMaterialRequest {

    @NotNull(message = "ID do produto é obrigatório")
    private Long productId;

    @NotNull(message = "ID da matéria-prima é obrigatório")
    private Long rawMaterialId;

    @NotNull(message = "Quantidade necessária é obrigatória")
    @Min(value = 1, message = "Quantidade necessária deve ser maior que zero")
    private Integer requiredQuantity;

    public CreateUpdateProductRawMaterialRequest() {
    }

    public CreateUpdateProductRawMaterialRequest(Long productId, Long rawMaterialId, Integer requiredQuantity) {
        this.productId = productId;
        this.rawMaterialId = rawMaterialId;
        this.requiredQuantity = requiredQuantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getRawMaterialId() {
        return rawMaterialId;
    }

    public void setRawMaterialId(Long rawMaterialId) {
        this.rawMaterialId = rawMaterialId;
    }

    public Integer getRequiredQuantity() {
        return requiredQuantity;
    }

    public void setRequiredQuantity(Integer requiredQuantity) {
        this.requiredQuantity = requiredQuantity;
    }
}