package dev.java.Autoflex.queryFilter;

import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.ProductRawMaterial;
import dev.java.Autoflex.specifications.ProductRawMaterialSpec;
import lombok.Data;

@Data
public class ProductRawMaterialFilter {

    private Long productId;
    private Long rawMaterialId;

    public Specification<ProductRawMaterial> toSpecification(){
        return Specification
            .where(ProductRawMaterialSpec.productEquals(productId))
            .and(ProductRawMaterialSpec.rawMaterialEquals(rawMaterialId));
    }
}