package dev.java.Autoflex.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import dev.java.Autoflex.dto.ProductionSuggestionResponse;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.model.ProductRawMaterial;
import dev.java.Autoflex.repository.ProductRawMaterialRepository;
import dev.java.Autoflex.repository.ProductRepository;
import dev.java.Autoflex.service.ProductionSuggestionService;

@Service
public class ProductionSuggestionServiceImpl implements ProductionSuggestionService {

    private final ProductRawMaterialRepository productRawMaterialRepository;
    private final ProductRepository productRepository;

    public ProductionSuggestionServiceImpl(
            ProductRawMaterialRepository productRawMaterialRepository,
            ProductRepository productRepository) {
        this.productRawMaterialRepository = productRawMaterialRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Page<ProductionSuggestionResponse> findProductionSuggestions(Pageable pageable) {
        List<Product> sortedProducts = productRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Product::getPrice).reversed())
                .collect(Collectors.toList());

        List<ProductRawMaterial> allMaterials = productRawMaterialRepository.findAll();

        // Monta um estoque simulado em memória, pegando os dados do reais do banco
        Map<Long, Integer> availableStock = new HashMap<>();

        allMaterials.forEach(x -> availableStock.putIfAbsent(
                x.getRawMaterial().getId(),
                x.getRawMaterial().getStockQuantity()));

        List<ProductionSuggestionResponse> suggestions = new ArrayList<>();

        for (Product product : sortedProducts) {

            // pegar materials de cada produto percorrido
            List<ProductRawMaterial> materialsOfProduct = allMaterials.stream()
                    .filter(m -> m.getProduct().getId().equals(product.getId()))
                    .collect(Collectors.toList());

            if (materialsOfProduct.isEmpty())
                continue;

            int maxProducible = calculateMaxProducible(materialsOfProduct, availableStock);

            if (maxProducible > 0) {
                for (ProductRawMaterial m : materialsOfProduct) {
                    Long materialId = m.getRawMaterial().getId();
                    int consumed = maxProducible * m.getRequiredQuantity();

                    // Desconta do estoque simulado
                    availableStock.merge(materialId, -consumed, Integer::sum);
                }
            }

            BigDecimal finalPrice = product.getPrice()
                    .multiply(BigDecimal.valueOf(maxProducible));

            String limitingMaterial = findLimitingMaterial(materialsOfProduct, availableStock);

            suggestions.add(new ProductionSuggestionResponse(
                    product.getId(),
                    product.getName(),
                    maxProducible,
                    product.getPrice(),
                    limitingMaterial,
                    finalPrice));
        }

        List<ProductionSuggestionResponse> filtered = suggestions.stream()
                .filter(s -> s.getProducibleQuantity() > 0)
                .collect(Collectors.toList());

        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int start = currentPage * pageSize;
        int end = Math.min(start + pageSize, filtered.size());

        List<ProductionSuggestionResponse> pageContent = start >= filtered.size() ? new ArrayList<>()
                : filtered.subList(start, end);

        return new PageImpl<>(pageContent, pageable, filtered.size());
    }

    // Método pra calcular o máximo de produção
    private int calculateMaxProducible(
            List<ProductRawMaterial> materials,
            Map<Long, Integer> availableStock) {

        int max = Integer.MAX_VALUE;

        for (ProductRawMaterial m : materials) {
            int stock = availableStock.getOrDefault(m.getRawMaterial().getId(), 0);
            int canProduce = stock / m.getRequiredQuantity();

            if (canProduce < max) {
                max = canProduce;
            }
        }

        return max == Integer.MAX_VALUE ? 0 : max;
    }

    // Pegar qual material ta limitando
    private String findLimitingMaterial(
            List<ProductRawMaterial> materials,
            Map<Long, Integer> availableStock) {

        int lowestCanProduce = Integer.MAX_VALUE;
        String limitingName = "Não identificado";

        for (ProductRawMaterial m : materials) {
            int stock = availableStock.getOrDefault(m.getRawMaterial().getId(), 0);
            int canProduce = stock / m.getRequiredQuantity();

            if (canProduce < lowestCanProduce) {
                lowestCanProduce = canProduce;
                limitingName = m.getRawMaterial().getName()
                        + " (estoque: " + stock
                        + ", necessário: " + m.getRequiredQuantity() + ")";
            }
        }

        return limitingName;
    }
}
