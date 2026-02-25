package dev.java.Autoflex.specifications;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.RawMaterial;

public class RawMaterialSpec {
    
    public static Specification<RawMaterial> nameContains(String name) {
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

    public static Specification<RawMaterial> stockQuantityGreaterThanOrEqual(Integer minStockQuantity) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(minStockQuantity)) {
                return null;
            }
            
            return builder.greaterThanOrEqualTo(
                root.get("stockQuantity"),
                minStockQuantity
            );
        };
    }

    public static Specification<RawMaterial> stockQuantityLessThanOrEqual(Integer maxStockQuantity) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(maxStockQuantity)) {
                return null;
            }
            
            return builder.lessThanOrEqualTo(
                root.get("stockQuantity"),
                maxStockQuantity
            );
        };
    }
}