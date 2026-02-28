package dev.java.Autoflex.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.java.Autoflex.dto.ProductionSuggestionResponse;

public interface ProductionSuggestionService {

    Page<ProductionSuggestionResponse> findProductionSuggestions(Pageable pageable);
}