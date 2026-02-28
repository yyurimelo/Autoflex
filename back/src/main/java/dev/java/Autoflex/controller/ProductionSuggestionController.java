package dev.java.Autoflex.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/get/all/paginated")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista paginada de sugestões de produção retornada com sucesso")
    })
    public ResponseEntity<Page<ProductionSuggestionResponse>> getAllPaginated(Pageable pageable) {
        Page<ProductionSuggestionResponse> response = productionSuggestionService.findProductionSuggestions(pageable);

        return ResponseEntity.ok(response);
    }
}