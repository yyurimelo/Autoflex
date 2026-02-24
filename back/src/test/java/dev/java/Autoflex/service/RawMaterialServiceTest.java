package dev.java.Autoflex.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import dev.java.Autoflex.exception.InvalidRawMaterialException;
import dev.java.Autoflex.exception.RawMaterialNotFoundException;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.repository.RawMaterialRepository;
import dev.java.Autoflex.service.impl.RawMaterialServiceImpl;

@ExtendWith(MockitoExtension.class)
class RawMaterialServiceTest {
    @Mock
    private RawMaterialRepository rawMaterialRepository;

    @InjectMocks
    private RawMaterialServiceImpl rawMaterialService;

    // POST
    @Test
    void shouldCreateRawMaterialSuccessfully(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName("Ferro");
        rawMaterial.setStockQuantity(100);

        when(rawMaterialRepository.save(rawMaterial)).thenReturn(rawMaterial);

        RawMaterial result = rawMaterialService.save(rawMaterial);

        assertNotNull(result);
        assertEquals("Ferro", result.getName());
        verify(rawMaterialRepository, times(1)).save(rawMaterial);
    }

    @Test
    void shouldThrowExceptionWhenRawMaterialNameIsNull(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName(null);
        rawMaterial.setStockQuantity(50);

        assertThrows(InvalidRawMaterialException.class, () -> {
            rawMaterialService.save(rawMaterial);
        });
    }

    @Test
    void shouldThrowExceptionWhenRawMaterialStockQuantityIsNull(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setName("Alumínio");
        rawMaterial.setStockQuantity(null);

        assertThrows(InvalidRawMaterialException.class, () -> {
            rawMaterialService.save(rawMaterial);
        });
    }

    // GET
    @Test
    void shouldFindRawMaterialByIdSuccessfully(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);
        rawMaterial.setName("Cobre");
        rawMaterial.setStockQuantity(75);

        when(rawMaterialRepository.findById(1L)).thenReturn(Optional.of(rawMaterial));

        RawMaterial result = rawMaterialService.findById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Cobre", result.getName());
    }

    @Test
    void shouldThrowExceptionWhenRawMaterialNotFound(){
        when(rawMaterialRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RawMaterialNotFoundException.class, () -> {
            rawMaterialService.findById(99L);
        });
    }

    @Test
    void shouldFindAllRawMaterialsSuccessfully(){
        List<RawMaterial> rawMaterials = List.of(
            new RawMaterial(),
            new RawMaterial()
        );

        when(rawMaterialRepository.findAll()).thenReturn(rawMaterials);

        List<RawMaterial> result = rawMaterialService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(rawMaterialRepository, times(1)).findAll();
    }

    // PUT
    @Test
    void shouldThrowExceptionWhenUpdatingRawMaterialNotFound(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(88L);
        rawMaterial.setName("Aço");
        rawMaterial.setStockQuantity(200);

        when(rawMaterialRepository.findById(88L)).thenReturn(Optional.empty());

        assertThrows(RawMaterialNotFoundException.class, () -> {
            rawMaterialService.update(rawMaterial);
        });
    }

    @Test
    void shouldUpdateRawMaterialSuccessfully(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(33L);
        rawMaterial.setName("Bronze");
        rawMaterial.setStockQuantity(150);

        when(rawMaterialRepository.findById(33L)).thenReturn(Optional.of(rawMaterial));
        when(rawMaterialRepository.save(rawMaterial)).thenReturn(rawMaterial);

        RawMaterial result = rawMaterialService.update(rawMaterial);

        assertNotNull(result);
        assertEquals("Bronze", result.getName());
        verify(rawMaterialRepository, times(1)).save(rawMaterial);
    }

    // DELETE
    @Test
    void shouldDeleteRawMaterialSuccessfully(){
        RawMaterial rawMaterial = new RawMaterial();
        rawMaterial.setId(1L);

        when(rawMaterialRepository.findById(1L)).thenReturn(Optional.of(rawMaterial));

        rawMaterialService.deleteById(1L);

        verify(rawMaterialRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingRawMaterialNotFound(){
        when(rawMaterialRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RawMaterialNotFoundException.class, () -> {
            rawMaterialService.deleteById(99L);
        });
    }
}