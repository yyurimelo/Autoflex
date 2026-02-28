package dev.java.Autoflex.dto;

public class ProductRawMaterialResponse {

    private Long id;
    private ProductResponse product;
    private RawMaterialResponse rawMaterial;
    private Integer requiredQuantity;

    public ProductRawMaterialResponse() {
    }

    public ProductRawMaterialResponse(Long id, ProductResponse product, RawMaterialResponse rawMaterial,
            Integer requiredQuantity) {
        this.id = id;
        this.product = product;
        this.rawMaterial = rawMaterial;
        this.requiredQuantity = requiredQuantity;
    }

    public Long getId() {
        return id;
    }

    public ProductResponse getProduct() {
        return product;
    }

    public RawMaterialResponse getRawMaterial() {
        return rawMaterial;
    }

    public Integer getRequiredQuantity() {
        return requiredQuantity;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProduct(ProductResponse product) {
        this.product = product;
    }

    public void setRawMaterial(RawMaterialResponse rawMaterial) {
        this.rawMaterial = rawMaterial;
    }

    public void setRequiredQuantity(Integer requiredQuantity) {
        this.requiredQuantity = requiredQuantity;
    }
}