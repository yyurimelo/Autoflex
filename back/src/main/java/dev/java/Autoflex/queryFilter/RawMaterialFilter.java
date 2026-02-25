package dev.java.Autoflex.queryFilter;

import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.specifications.RawMaterialSpec;
import lombok.Data;

@Data
public class RawMaterialFilter {

    private String name;
    private Integer minStockQuantity;
    private Integer maxStockQuantity;

    public Specification<RawMaterial> toSpecification(){
        return Specification
            .where(RawMaterialSpec.nameContains(name))
            .and(RawMaterialSpec.stockQuantityGreaterThanOrEqual(minStockQuantity))
            .and(RawMaterialSpec.stockQuantityLessThanOrEqual(maxStockQuantity));
    }
}