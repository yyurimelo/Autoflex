package dev.java.Autoflex.specifications;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.Product;

public class ProductSpec {
    
    public static Specification<Product> nameContains(String name) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(name)) {
                return null;
            }
            
            return builder.like(
                builder.upper(root.get("name")),
                "%" + name.toUpperCase() + "%"
            );
        };
    }

    public static Specification<Product> priceGreaterThanOrEqual(Double minPrice) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(minPrice)) {
                return null;
            }
            
            return builder.greaterThanOrEqualTo(
                root.get("price"),
                minPrice
            );
        };
    }

    public static Specification<Product> priceLessThanOrEqual(Double maxPrice) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(maxPrice)) {
                return null;
            }
            
            return builder.lessThanOrEqualTo(
                root.get("price"),
                maxPrice
            );
        };
    }

    public static Specification<Product> producibleQuantityGreaterThanOrEqual(Integer minProducibleQuantity) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(minProducibleQuantity)) {
                return null;
            }
            
            return builder.greaterThanOrEqualTo(
                root.get("producibleQuantity"),
                minProducibleQuantity
            );
        };
    }

    public static Specification<Product> producibleQuantityLessThanOrEqual(Integer maxProducibleQuantity) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(maxProducibleQuantity)) {
                return null;
            }
            
            return builder.lessThanOrEqualTo(
                root.get("producibleQuantity"),
                maxProducibleQuantity
            );
        };
    }
}