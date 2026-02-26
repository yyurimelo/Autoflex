package dev.java.Autoflex.controller;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.java.Autoflex.dto.CreateUpdateProductRawMaterialRequest;
import dev.java.Autoflex.dto.ProductRawMaterialResponse;
import dev.java.Autoflex.dto.ProductResponse;
import dev.java.Autoflex.dto.RawMaterialResponse;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.model.ProductRawMaterial;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.dto.queryFilter.ProductRawMaterialFilter;
import dev.java.Autoflex.service.ProductRawMaterialService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "ProductRawMaterialController")
@RestController
@RequestMapping("/api/v1/product-raw-material")
public class ProductRawMaterialController {

    private final ProductRawMaterialService productRawMaterialService;
    private final ModelMapper modelMapper;

    public ProductRawMaterialController(ProductRawMaterialService productRawMaterialService, ModelMapper modelMapper) {
        this.productRawMaterialService = productRawMaterialService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("create")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Associação entre produto e matéria-prima criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
        @ApiResponse(responseCode = "404", description = "Produto ou matéria-prima não encontrado"),
        @ApiResponse(responseCode = "409", description = "Associação entre produto e matéria-prima já existe")
    })
    public ResponseEntity<ProductRawMaterialResponse> create(@RequestBody CreateUpdateProductRawMaterialRequest request) {
        ProductRawMaterial productRawMaterial = convertToEntity(request);
        ProductRawMaterial saved = productRawMaterialService.create(productRawMaterial);
        
        ProductRawMaterialResponse response = convertToResponseMap(saved);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/get/all/paginated")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista filtrada e paginada de associações entre produtos e matérias-primas retornada com sucesso")
    })
    public ResponseEntity<Page<ProductRawMaterialResponse>> list(
            @RequestBody ProductRawMaterialFilter filter,
            Pageable pageable) {
        
        Page<ProductRawMaterial> page = productRawMaterialService.findByFilters(filter, pageable);
        
        Page<ProductRawMaterialResponse> response = page.map(this::convertToResponseMap);
        
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("get/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Associação entre produto e matéria-prima encontrada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Associação não encontrada")
    })
    public ResponseEntity<ProductRawMaterialResponse> findById(@PathVariable Long id) {
        ProductRawMaterial productRawMaterial = productRawMaterialService.findById(id);
        ProductRawMaterialResponse response = convertToResponseMap(productRawMaterial);
        
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @DeleteMapping("delete/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Associação entre produto e matéria-prima excluída com sucesso"),
        @ApiResponse(responseCode = "404", description = "Associação não encontrada")
    })
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        productRawMaterialService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    private ProductRawMaterial convertToEntity(CreateUpdateProductRawMaterialRequest request) {
        ProductRawMaterial productRawMaterial = new ProductRawMaterial();
        
        Product product = new Product();
        product.setId(request.getProductId());
        productRawMaterial.setProduct(product);
        
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(request.getRawMaterialId());
        productRawMaterial.setRawMaterial(rawMaterial);
        
        productRawMaterial.setRequiredQuantity(request.getRequiredQuantity());
        
        return productRawMaterial;
    }

    private ProductRawMaterialResponse convertToResponseMap(ProductRawMaterial productRawMaterial) {
        ProductRawMaterialResponse response = new ProductRawMaterialResponse();
        
        response.setId(productRawMaterial.getId());
        response.setRequiredQuantity(productRawMaterial.getRequiredQuantity());
        
        ProductResponse productResponse = modelMapper.map(productRawMaterial.getProduct(), ProductResponse.class);
        response.setProduct(productResponse);
        
        RawMaterialResponse rawMaterialResponse = modelMapper.map(productRawMaterial.getRawMaterial(), RawMaterialResponse.class);
        response.setRawMaterial(rawMaterialResponse);
        
        return response;
    }
}