package com.algodulce.backend.repository;

import com.algodulce.backend.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    @Query("SELECT DISTINCT c FROM Categoria c LEFT JOIN FETCH c.productos ORDER BY c.orden ASC")
    List<Categoria> findAllConProductosOrderByOrdenAsc();

    @Query("SELECT c FROM Categoria c LEFT JOIN FETCH c.productos WHERE c.id = :id")
    Optional<Categoria> findByIdConProductos(@Param("id") Long id);
}
