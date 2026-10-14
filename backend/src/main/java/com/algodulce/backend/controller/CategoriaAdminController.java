package com.algodulce.backend.controller;

import com.algodulce.backend.dto.CategoriaDTO;
import com.algodulce.backend.model.Categoria;
import com.algodulce.backend.repository.CategoriaRepository;
import com.algodulce.backend.util.Textos;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categorias")
public class CategoriaAdminController {

    private final CategoriaRepository categoriaRepository;

    public CategoriaAdminController(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping
    public ResponseEntity<CategoriaDTO> crear(@RequestBody CategoriaRequest datos) {
        Categoria categoria = new Categoria();
        categoria.setNombre(datos.nombre());
        categoria.setSlug(Textos.generarSlug(datos.nombre()));
        categoria.setOrden((int) categoriaRepository.count());

        Categoria guardada = categoriaRepository.save(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(CategoriaDTO.desde(guardada));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDTO> actualizar(@PathVariable Long id, @RequestBody CategoriaRequest datos) {
        Categoria categoria = categoriaRepository.findByIdConProductos(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada"));

        categoria.setNombre(datos.nombre());

        Categoria actualizada = categoriaRepository.save(categoria);
        return ResponseEntity.ok(CategoriaDTO.desde(actualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }
        categoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/mover")
    public ResponseEntity<Void> mover(@PathVariable Long id, @RequestParam String direccion) {
        List<Categoria> todas = categoriaRepository.findAll(Sort.by("orden"));

        int indice = -1;
        for (int i = 0; i < todas.size(); i++) {
            if (todas.get(i).getId().equals(id)) {
                indice = i;
                break;
            }
        }
        if (indice == -1) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoría no encontrada");
        }

        int indiceVecino = "arriba".equals(direccion) ? indice - 1 : indice + 1;
        if (indiceVecino < 0 || indiceVecino >= todas.size()) {
            return ResponseEntity.noContent().build();
        }

        Categoria categoria = todas.get(indice);
        Categoria vecina = todas.get(indiceVecino);
        Integer ordenTemporal = categoria.getOrden();
        categoria.setOrden(vecina.getOrden());
        vecina.setOrden(ordenTemporal);

        categoriaRepository.save(categoria);
        categoriaRepository.save(vecina);

        return ResponseEntity.noContent().build();
    }

    public record CategoriaRequest(String nombre) {
    }
}
