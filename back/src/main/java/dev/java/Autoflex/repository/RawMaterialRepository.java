package dev.java.Autoflex.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.java.Autoflex.model.RawMaterial;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {
    Page<RawMaterial> findAll(Pageable pageable);
}