package dev.java.Autoflex.service;

import java.util.List;

import dev.java.Autoflex.dto.ProductionSuggestionFilterRequest;
import dev.java.Autoflex.dto.ProductionSuggestionResponse;
import org.springframework.data.domain.Page;

public interface ProductionSuggestionService {
    
    Page<ProductionSuggestionResponse> findProductionSuggestions(ProductionSuggestionFilterRequest filterRequest);
}