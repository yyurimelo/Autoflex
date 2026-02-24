package dev.java.Autoflex.service;

import java.util.List;

import dev.java.Autoflex.model.RawMaterial;

public interface RawMaterialService {
    RawMaterial save(RawMaterial rawMaterial);

    List<RawMaterial> findAll();

    RawMaterial findById(Long id);

    RawMaterial update(RawMaterial rawMaterial);

    void deleteById(Long id);
}