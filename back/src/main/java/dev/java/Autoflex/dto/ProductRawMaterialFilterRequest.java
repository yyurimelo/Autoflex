package dev.java.Autoflex.dto;

public class ProductRawMaterialFilterRequest {
    private Long productId;
    private Long rawMaterialId;
    private Integer minRequiredQuantity;
    private Integer maxRequiredQuantity;
    private int page = 0;
    private int size = 10;
    private String sortBy = "id";
    private String sortDirection = "asc";

    public ProductRawMaterialFilterRequest() {
    }

    public ProductRawMaterialFilterRequest(Long productId, Long rawMaterialId, Integer minRequiredQuantity, 
            Integer maxRequiredQuantity, int page, int size, String sortBy, String sortDirection) {
        this.productId = productId;
        this.rawMaterialId = rawMaterialId;
        this.minRequiredQuantity = minRequiredQuantity;
        this.maxRequiredQuantity = maxRequiredQuantity;
        this.page = page;
        this.size = size;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
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

    public Integer getMinRequiredQuantity() {
        return minRequiredQuantity;
    }

    public void setMinRequiredQuantity(Integer minRequiredQuantity) {
        this.minRequiredQuantity = minRequiredQuantity;
    }

    public Integer getMaxRequiredQuantity() {
        return maxRequiredQuantity;
    }

    public void setMaxRequiredQuantity(Integer maxRequiredQuantity) {
        this.maxRequiredQuantity = maxRequiredQuantity;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }
}