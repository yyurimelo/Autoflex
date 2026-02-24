package dev.java.Autoflex.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.java.Autoflex.exception.InvalidRawMaterialException;
import dev.java.Autoflex.exception.RawMaterialNotFoundException;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.repository.RawMaterialRepository;
import dev.java.Autoflex.service.RawMaterialService;

@Service
public class RawMaterialServiceImpl implements RawMaterialService {
    
    private final RawMaterialRepository rawMaterialRepository;

    public RawMaterialServiceImpl(RawMaterialRepository rawMaterialRepository) {
        this.rawMaterialRepository = rawMaterialRepository;
    }

    @Override
    public RawMaterial save(RawMaterial rawMaterial) {
        if ((rawMaterial.getName() == null || rawMaterial.getName().isBlank()) || (rawMaterial.getStockQuantity() == null)) {
            throw new InvalidRawMaterialException();
        }
        
        return rawMaterialRepository.save(rawMaterial);
    }

    @Override
    public List<RawMaterial> findAll() {
        return rawMaterialRepository.findAll();
    }

    @Override
    public RawMaterial findById(Long id) {
        return rawMaterialRepository.findById(id)
            .orElseThrow(RawMaterialNotFoundException::new);
    }

    @Override
    public RawMaterial update(RawMaterial rawMaterial) {
        RawMaterial existing = rawMaterialRepository.findById(rawMaterial.getId())
                .orElseThrow(RawMaterialNotFoundException::new);

        existing.setName(rawMaterial.getName());
        existing.setStockQuantity(rawMaterial.getStockQuantity());
        // atualize só os campos que fazem sentido alterar

        return rawMaterialRepository.save(existing);
    }

    @Override
    public void deleteById(Long id) {
        rawMaterialRepository.findById(id).orElseThrow(RawMaterialNotFoundException::new);

        rawMaterialRepository.deleteById(id);
    }
}