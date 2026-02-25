package dev.java.Autoflex.dto;

public class ProductionSuggestionFilterRequest {
    private Long productId;
    private String productName;
    private Integer minProducibleQuantity;
    private Integer maxProducibleQuantity;
    private int page = 0;
    private int size = 10;
    private String sortBy = "producibleQuantity";
    private String sortDirection = "desc";

    public ProductionSuggestionFilterRequest() {
    }

    public ProductionSuggestionFilterRequest(Long productId, String productName, Integer minProducibleQuantity, 
            Integer maxProducibleQuantity, int page, int size, String sortBy, String sortDirection) {
        this.productId = productId;
        this.productName = productName;
        this.minProducibleQuantity = minProducibleQuantity;
        this.maxProducibleQuantity = maxProducibleQuantity;
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

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getMinProducibleQuantity() {
        return minProducibleQuantity;
    }

    public void setMinProducibleQuantity(Integer minProducibleQuantity) {
        this.minProducibleQuantity = minProducibleQuantity;
    }

    public Integer getMaxProducibleQuantity() {
        return maxProducibleQuantity;
    }

    public void setMaxProducibleQuantity(Integer maxProducibleQuantity) {
        this.maxProducibleQuantity = maxProducibleQuantity;
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