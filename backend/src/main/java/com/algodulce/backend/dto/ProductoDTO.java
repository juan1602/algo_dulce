package com.algodulce.backend.dto;

import com.algodulce.backend.model.Producto;

public record ProductoDTO(
    Long id,
    String nombre,
    String descripcion,
    Integer precio,
    boolean destacado,
    String imagenUrl
) {

    public static ProductoDTO desde(Producto producto) {
        return new ProductoDTO(
            producto.getId(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getPrecio(),
            producto.isDestacado(),
            producto.getImagenUrl()
        );
    }
}
