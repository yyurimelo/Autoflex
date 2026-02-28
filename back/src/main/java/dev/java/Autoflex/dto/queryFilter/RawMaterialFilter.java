package dev.java.Autoflex.dto.queryFilter;

import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.specifications.RawMaterialSpec;
import lombok.Data;

@Data
public class RawMaterialFilter {

    private String name;
    private Integer stockQuantity;

    public Specification<RawMaterial> toSpecification() {
        return Specification
                .where(RawMaterialSpec.nameContains(name))
                .and(RawMaterialSpec.stockQuantityEquals(stockQuantity));
    }
}