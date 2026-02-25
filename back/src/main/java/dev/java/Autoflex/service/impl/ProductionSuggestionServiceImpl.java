package dev.java.Autoflex.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
        List<ProductionSuggestionResponse> allSuggestions = calculateAllProductionSuggestions();
        
        // Filtrar apenas produtos com matérias-primas associadas e que podem ser produzidos
        List<ProductionSuggestionResponse> filteredSuggestions = allSuggestions.stream()
                .filter(suggestion -> suggestion.getProducibleQuantity() > 0)
                .collect(Collectors.toList());
        
        // Ordenar
        Sort sort = pageable.getSort();
        Comparator<ProductionSuggestionResponse> comparator = getComparator(sort);
        filteredSuggestions.sort(comparator);
        
        // Paginar
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        int startItem = currentPage * pageSize;
        
        List<ProductionSuggestionResponse> pageContent;
        if (filteredSuggestions.size() < startItem) {
            pageContent = new ArrayList<>();
        } else {
            int toIndex = Math.min(startItem + pageSize, filteredSuggestions.size());
            pageContent = filteredSuggestions.subList(startItem, toIndex);
        }
        
        return new PageImpl<>(pageContent, pageable, filteredSuggestions.size());
    }

    private List<ProductionSuggestionResponse> calculateAllProductionSuggestions() {
        List<Product> products = productRepository.findAll();
        List<ProductionSuggestionResponse> suggestions = new ArrayList<>();
        
        for (Product product : products) {
            List<ProductRawMaterial> materials = productRawMaterialRepository.findByProductId(product.getId());
            suggestions.add(calculateProductionSuggestion(product, materials));
        }
        
        return suggestions;
    }

    private ProductionSuggestionResponse calculateProductionSuggestion(Product product, List<ProductRawMaterial> materials) {
        if (materials.isEmpty()) {
            BigDecimal finalPrice = BigDecimal.ZERO;
            return new ProductionSuggestionResponse(
                    product.getId(), 
                    product.getName(), 
                    0, 
                    product.getPrice(),
                    "Sem matérias-primas associadas",
                    finalPrice
            );
        }
        
        Integer maxProducible = null;
        String limitingMaterial = "";
        
        for (ProductRawMaterial material : materials) {
            Integer stockQuantity = material.getRawMaterial().getStockQuantity();
            Integer requiredQuantity = material.getRequiredQuantity();
            
            Integer producibleWithThisMaterial = stockQuantity / requiredQuantity;
            
            if (maxProducible == null || producibleWithThisMaterial < maxProducible) {
                maxProducible = producibleWithThisMaterial;
                limitingMaterial = material.getRawMaterial().getName() + " (estoque: " + stockQuantity + ", necessário: " + requiredQuantity + ")";
            }
        }
        
        BigDecimal finalPrice = product.getPrice().multiply(BigDecimal.valueOf(maxProducible));
        return new ProductionSuggestionResponse(
                product.getId(), 
                product.getName(), 
                maxProducible, 
                product.getPrice(),
                limitingMaterial,
                finalPrice
        );
    }

    private Comparator<ProductionSuggestionResponse> getComparator(Sort sort) {
        if (sort.isEmpty()) {
            return Comparator.comparing(ProductionSuggestionResponse::getProductId);
        }
        
        Sort.Order order = sort.iterator().next();
        String sortBy = order.getProperty();
        Sort.Direction direction = order.getDirection();
        
        Comparator<ProductionSuggestionResponse> comparator;
        
        switch (sortBy.toLowerCase()) {
            case "productname":
                comparator = Comparator.comparing(ProductionSuggestionResponse::getProductName);
                break;
            case "produciblequantity":
                comparator = Comparator.comparing(ProductionSuggestionResponse::getProducibleQuantity);
                break;
            case "limitingmaterial":
                comparator = Comparator.comparing(ProductionSuggestionResponse::getLimitingMaterial);
                break;
            case "finalprice":
                comparator = Comparator.comparing(ProductionSuggestionResponse::getFinalPrice);
                break;
            default:
                comparator = Comparator.comparing(ProductionSuggestionResponse::getProductId);
                break;
        }
        
        return direction == Sort.Direction.DESC ? comparator.reversed() : comparator;
    }
}