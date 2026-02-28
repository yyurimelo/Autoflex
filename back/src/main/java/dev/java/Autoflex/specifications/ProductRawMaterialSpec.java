package dev.java.Autoflex.specifications;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;

import dev.java.Autoflex.model.ProductRawMaterial;

public class ProductRawMaterialSpec {

    public static Specification<ProductRawMaterial> productEquals(Long productId) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(productId)) {
                return null;
            }

            return builder.equal(
                    root.get("product").get("id"),
                    productId);

        };
    }

    public static Specification<ProductRawMaterial> rawMaterialEquals(Long rawMaterialId) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(rawMaterialId)) {
                return null;
            }

            return builder.equal(
                    root.get("rawMaterial").get("id"),
                    rawMaterialId);
        };
    }
}
