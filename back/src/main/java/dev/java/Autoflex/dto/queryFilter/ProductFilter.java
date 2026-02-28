package dev.java.Autoflex.dto.queryFilter;

import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.specifications.ProductSpec;
import lombok.Data;

@Data
public class ProductFilter {

    private String name;
    private Double price;

    public Specification<Product> toSpecification(){
        return Specification
            .where(ProductSpec.nameContains(name))
            .and(ProductSpec.priceEquals(price));
    }
}