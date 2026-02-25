package dev.java.Autoflex.queryFilter;

import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.specifications.ProductSpec;
import lombok.Data;

@Data
public class ProductFilter {

    private String name;
    private Double minPrice;
    private Double maxPrice;
    private Integer minProducibleQuantity;
    private Integer maxProducibleQuantity;

    public Specification<Product> toSpecification(){
        return Specification
            .where(ProductSpec.nameContains(name))
            .and(ProductSpec.priceGreaterThanOrEqual(minPrice))
            .and(ProductSpec.priceLessThanOrEqual(maxPrice))
            .and(ProductSpec.producibleQuantityGreaterThanOrEqual(minProducibleQuantity))
            .and(ProductSpec.producibleQuantityLessThanOrEqual(maxProducibleQuantity));
    }
}