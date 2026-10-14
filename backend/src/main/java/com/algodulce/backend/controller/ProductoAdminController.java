package com.algodulce.backend.controller;

import com.algodulce.backend.dto.ProductoDTO;
import com.algodulce.backend.model.Categoria;
import com.algodulce.backend.model.Producto;
import com.algodulce.backend.repository.CategoriaRepository;
import com.algodulce.backend.repository.ProductoRepository;
import com.algodulce.backend.util.Textos;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/admin/productos")
public class ProductoAdminController {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoAdminController(ProductoRepository productoRepository, CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody ProductoRequest datos) {
        Categoria categoria = obtenerCategoria(datos.categoriaId());

        Producto producto = new Producto();
        aplicarDatos(producto, datos, categoria);
        producto.setOrden((int) productoRepository.count());

        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(ProductoDTO.desde(guardado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id, @RequestBody ProductoRequest datos) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        Categoria categoria = obtenerCategoria(datos.categoriaId());
        aplicarDatos(producto, datos, categoria);

        Producto actualizado = productoRepository.save(producto);
        return ResponseEntity.ok(ProductoDTO.desde(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!productoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado");
        }
        productoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/mover")
    public ResponseEntity<Void> mover(@PathVariable Long id, @RequestParam String direccion) {
        Producto producto = productoRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Producto no encontrado"));

        List<Producto> hermanos = productoRepository.findByCategoriaIdOrderByOrdenAsc(
            producto.getCategoria().getId()
        );

        int indice = -1;
        for (int i = 0; i < hermanos.size(); i++) {
            if (hermanos.get(i).getId().equals(id)) {
                indice = i;
                break;
            }
        }

        int indiceVecino = "arriba".equals(direccion) ? indice - 1 : indice + 1;
        if (indiceVecino < 0 || indiceVecino >= hermanos.size()) {
            return ResponseEntity.noContent().build();
        }

        Producto vecino = hermanos.get(indiceVecino);
        Integer ordenTemporal = producto.getOrden();
        producto.setOrden(vecino.getOrden());
        vecino.setOrden(ordenTemporal);

        productoRepository.save(producto);
        productoRepository.save(vecino);

        return ResponseEntity.noContent().build();
    }

    private Categoria obtenerCategoria(Long categoriaId) {
        return categoriaRepository.findById(categoriaId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Categoría no encontrada"));
    }

    private void aplicarDatos(Producto producto, ProductoRequest datos, Categoria categoria) {
        producto.setNombre(datos.nombre());
        producto.setDescripcion(datos.descripcion());
        producto.setPrecio(datos.precio());
        producto.setDestacado(datos.destacado());
        producto.setImagenUrl(datos.imagenUrl());
        producto.setCategoria(categoria);
        if (producto.getSlug() == null) {
            producto.setSlug(Textos.generarSlug(datos.nombre()));
        }
    }

    public record ProductoRequest(
        String nombre,
        String descripcion,
        Integer precio,
        boolean destacado,
        String imagenUrl,
        Long categoriaId
    ) {
    }
}
