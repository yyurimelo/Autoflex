package dev.java.Autoflex.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.java.Autoflex.dto.CreateUpdateProductRequest;
import dev.java.Autoflex.dto.ProductResponse;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.dto.queryFilter.ProductFilter;
import dev.java.Autoflex.service.ProductService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;




@Tag(name = "ProductController")
@RestController
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductService productService;
    private final ModelMapper modelMapper;
    
    public ProductController(ProductService productService, ModelMapper modelMapper) {
        this.productService = productService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("create")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Produto criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<ProductResponse> create(@RequestBody CreateUpdateProductRequest request) {
        Product product = convertToEntity(request);
        Product saved = productService.save(product);
        ProductResponse response = convertToResponseMap(saved);
        
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("update/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Produto atualizado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @RequestBody CreateUpdateProductRequest request) {

        Product product = convertToEntity(request);
        product.setId(id);
        productService.update(product);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("get/all")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista de produtos retornada com sucesso")
    })
    public ResponseEntity<List<ProductResponse>> getAll(){
        List<ProductResponse> response =
                productService.findAll()
                        .stream()
                        .map(this::convertToResponseMap)
                        .toList();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("get/all/paginated")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista paginada de produtos retornada com sucesso")
    })
    public ResponseEntity<Page<ProductResponse>> getAllPaginated(
            @RequestBody ProductFilter filter,
            Pageable pageable) {

        Page<ProductResponse> response = productService.findByFilters(filter, pageable)
                .map(this::convertToResponseMap);

        return ResponseEntity.ok(response);
    }

    @GetMapping("get/by/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public ResponseEntity<ProductResponse> findById(@PathVariable Long id){
        Product product = productService.findById(id);
        ProductResponse response = convertToResponseMap(product);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @DeleteMapping("delete")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Produto excluído com sucesso"),
        @ApiResponse(responseCode = "404", description = "Produto não encontrado")
    })
    public ResponseEntity<Void> deleteById(@RequestParam Long id){
        productService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
    private Product convertToEntity(CreateUpdateProductRequest request) {
        return modelMapper.map(request, Product.class);
    }

    private ProductResponse convertToResponseMap(Product product) {
        return modelMapper.map(product, ProductResponse.class);
    }
}
