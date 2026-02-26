package dev.java.Autoflex.service;

import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import static org.assertj.core.api.Assertions.assertThat;

import dev.java.Autoflex.dto.ProductionSuggestionResponse;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.model.ProductRawMaterial;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.repository.ProductRawMaterialRepository;
import dev.java.Autoflex.repository.ProductRepository;
import dev.java.Autoflex.service.impl.ProductionSuggestionServiceImpl;

@ExtendWith(MockitoExtension.class)
class ProductionSuggestionsServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductRawMaterialRepository productRawMaterialRepository;

    @InjectMocks
    private ProductionSuggestionServiceImpl service;

    private Product cadeira;
    private Product mesa;
    private RawMaterial madeira;
    private RawMaterial parafuso;

    @BeforeEach
    void setUp() {
        // Produtos
        cadeira = new Product();
        cadeira.setId(1L);
        cadeira.setName("Cadeira");
        cadeira.setPrice(new BigDecimal("200.00"));

        mesa = new Product();
        mesa.setId(2L);
        mesa.setName("Mesa");
        mesa.setPrice(new BigDecimal("100.00"));

        // Matérias-primas
        madeira = new RawMaterial();
        madeira.setId(1L);
        madeira.setName("Madeira");
        madeira.setStockQuantity(10);

        parafuso = new RawMaterial();
        parafuso.setId(2L);
        parafuso.setName("Parafuso");
        parafuso.setStockQuantity(24);
    }

    @Test
    void shouldSuggestProductionPrioritizingHigherValueProduct() {

        ProductRawMaterial cadeiraMadeira = new ProductRawMaterial();
        cadeiraMadeira.setId(1L);
        cadeiraMadeira.setProduct(cadeira);
        cadeiraMadeira.setRawMaterial(madeira);
        cadeiraMadeira.setRequiredQuantity(2); 

        ProductRawMaterial cadeiraParafuso = new ProductRawMaterial();
        cadeiraParafuso.setId(2L);
        cadeiraParafuso.setProduct(cadeira);
        cadeiraParafuso.setRawMaterial(parafuso);
        cadeiraParafuso.setRequiredQuantity(4);

        ProductRawMaterial mesaMadeira = new ProductRawMaterial();
        mesaMadeira.setId(3L);
        mesaMadeira.setProduct(mesa);
        mesaMadeira.setRawMaterial(madeira);
        mesaMadeira.setRequiredQuantity(3);

        when(productRepository.findAll())
                .thenReturn(List.of(cadeira, mesa));

        when(productRawMaterialRepository.findAll())
                .thenReturn(List.of(cadeiraMadeira, cadeiraParafuso, mesaMadeira));

        Page<ProductionSuggestionResponse> result = service.findProductionSuggestions(PageRequest.of(0, 10));

        assertThat(result.getContent()).hasSize(1);

        ProductionSuggestionResponse cadeiraResult = result.getContent().get(0);
        assertThat(cadeiraResult.getProductName()).isEqualTo("Cadeira");
        assertThat(cadeiraResult.getProducibleQuantity()).isEqualTo(5);
        assertThat(cadeiraResult.getFinalPrice()).isEqualByComparingTo("1000.00");
    }
}
