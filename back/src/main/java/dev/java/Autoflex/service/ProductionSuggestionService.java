package dev.java.Autoflex.service;

import org.springframework.data.domain.Page;

import dev.java.Autoflex.dto.ProductionSuggestionFilterRequest;
import dev.java.Autoflex.dto.ProductionSuggestionResponse;

public interface ProductionSuggestionService {
    
    Page<ProductionSuggestionResponse> findProductionSuggestions(ProductionSuggestionFilterRequest filterRequest);
}