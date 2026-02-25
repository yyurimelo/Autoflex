package dev.java.Autoflex.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.java.Autoflex.dto.ProductionSuggestionFilterRequest;
import dev.java.Autoflex.dto.ProductionSuggestionPageResponse;
import dev.java.Autoflex.dto.ProductionSuggestionResponse;
import dev.java.Autoflex.service.ProductionSuggestionService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "ProductionSuggestionController")
@RestController
@RequestMapping("/api/v1/production-suggestion")
public class ProductionSuggestionController {

    private final ProductionSuggestionService productionSuggestionService;

    public ProductionSuggestionController(ProductionSuggestionService productionSuggestionService) {
        this.productionSuggestionService = productionSuggestionService;
    }

    @PostMapping("get/all/paginated")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista de sugestões de produção retornada com sucesso")
    })
    public ResponseEntity<ProductionSuggestionPageResponse> list(@RequestBody ProductionSuggestionFilterRequest filterRequest) {
        Page<ProductionSuggestionResponse> page = productionSuggestionService.findProductionSuggestions(filterRequest);
        
        ProductionSuggestionPageResponse response = new ProductionSuggestionPageResponse(
                page.getContent(), 
                page.getNumber(), 
                page.getSize(), 
                page.getTotalElements(), 
                page.getTotalPages(), 
                page.isFirst(), 
                page.isLast(), 
                page.isEmpty()
        );
        
        return ResponseEntity.ok(response);
    }

    
}