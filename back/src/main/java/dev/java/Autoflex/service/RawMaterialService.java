package dev.java.Autoflex.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import dev.java.Autoflex.model.RawMaterial;

public interface RawMaterialService {
    RawMaterial save(RawMaterial rawMaterial);

    List<RawMaterial> findAll();

    Page<RawMaterial> findAll(Pageable pageable);

    RawMaterial findById(Long id);

    RawMaterial update(RawMaterial rawMaterial);

    void deleteById(Long id);
}