package dev.java.Autoflex.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import dev.java.Autoflex.exception.InvalidProductException;
import dev.java.Autoflex.exception.ProductNotFoundException;
import dev.java.Autoflex.model.Product;
import dev.java.Autoflex.repository.ProductRepository;
import dev.java.Autoflex.service.impl.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    // POST
    @Test
    void shouldCreateProductSuccessfully(){
        Product product = new Product();
        product.setName("Pneu");
        product.setPrice(new BigDecimal("350.00"));

        when(productRepository.save(product)).thenReturn(product);

        Product result = productService.save(product);

        assertNotNull(result);
        assertEquals("Pneu", result.getName());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    void shouldThrowExceptionWhenProductNameIsNull(){
        Product product = new Product();
        product.setName(null);
        product.setPrice((new BigDecimal(300)));

        assertThrows(InvalidProductException.class, () -> {
            productService.save(product);
        });
    }

    @Test
    void shouldThrowExceptionWhenProductPriceIsNull(){
        Product product = new Product();
        product.setName("Pneu");
        product.setPrice(null);

        assertThrows(InvalidProductException.class, () -> {
            productService.save(product);
        });
    }

    // GET
    @Test
    void shouldFindProductByIdSuccessfully(){
        Product product = new Product();
        product.setId(1L);
        product.setName("Pneu");
        product.setPrice(new BigDecimal("350.00"));

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        Product result = productService.findById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Pneu", result.getName());
    }

    @Test
    void shouldThrowExceptionWhenProductNotFound(){
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> {
            productService.findById(99L);
        });
    }

    @Test
    void shouldFindAllProductsSuccessfully(){
        List<Product> products = List.of(
            new Product(),
            new Product()
        );

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(productRepository, times(1)).findAll();
    }

    // PUT
    @Test
    void shouldThrowExceptionWhenUpdatingProductNotFound(){
        Product product = new Product();
        product.setId(88L);
        product.setName("Martelo");
        product.setPrice(new BigDecimal("50.00"));

        when(productRepository.findById(88L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> {
            productService.update(product);
        });
    }

    @Test
    void shouldUpdateProductSuccessfully(){
        Product product = new Product();
        product.setId(33L);
        product.setName("Pneu");
        product.setPrice(new BigDecimal("350.00"));

        when(productRepository.findById(33L)).thenReturn(Optional.of(product));
        when(productRepository.save(product)).thenReturn(product);

        Product result = productService.update(product);

        assertNotNull(result);
        assertEquals("Pneu", result.getName());
        verify(productRepository, times(1)).save(product);
    }

    // DELETE
    @Test
    void shouldDeleteProductSuccessfully(){
        Product product = new Product();
        product.setId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.deleteById(1L);

        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingProductNotFound(){
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> {
            productService.deleteById(99L);
        });
    }
}
