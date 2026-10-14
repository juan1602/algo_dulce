package com.algodulce.backend.config;

import com.algodulce.backend.model.Categoria;
import com.algodulce.backend.model.Producto;
import com.algodulce.backend.repository.CategoriaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Carga el menú inicial de Algo Dulce la primera vez que se levanta
 * la base de datos, para no arrancar con el panel vacío.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;

    public DataSeeder(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    public void run(String... args) {
        if (categoriaRepository.count() > 0) {
            return;
        }

        int ordenCategoria = 0;

        Categoria meriendas = nuevaCategoria("meriendas", "Meriendas", ordenCategoria++);
        producto(meriendas, "sandwich-club", "Sándwich Club", "Lechuga, tomate, jamón, queso y tocineta.", 12000, false);
        producto(meriendas, "sandwich-de-pollo", "Sándwich de pollo", "Lechuga, tomate, jamón, queso y pollo.", 14000, false);
        producto(meriendas, "sandwich-de-jamon-y-queso", "Sándwich de jamón y queso", null, 7000, false);
        producto(meriendas, "palitos-de-queso", "Palitos de queso", null, 4000, false);
        producto(meriendas, "waffle-con-fruta-y-helado", "Waffle con fruta y helado", null, 15000, true);
        producto(meriendas, "waffle-pudin", "Waffle pudín", "Trozos de waffle en copa con helado y salsas.", 15000, false);
        producto(meriendas, "brownie-con-helado", "Brownie con helado", null, 14000, true);
        producto(meriendas, "salpicon", "Salpicón", null, 8000, false);
        producto(meriendas, "salpicon-con-helado", "Salpicón con helado", null, 10000, false);
        producto(meriendas, "canasta-de-helado-2-sabores", "Canasta de helado 2 sabores",
            "Pregunta por los sabores disponibles.", 12000, false);
        categoriaRepository.save(meriendas);

        Categoria saludables = nuevaCategoria("opciones-saludables", "Opciones saludables", ordenCategoria++);
        producto(saludables, "sandwich-de-pollo-en-pan-de-arroz", "Sándwich de pollo en pan de arroz", null, 10000, false);
        producto(saludables, "bowl-de-yogurt-griego-fruta-y-granola", "Bowl de yogurt griego, fruta y granola", null, 15000, false);
        categoriaRepository.save(saludables);

        Categoria bebidasCalientes = nuevaCategoria("bebidas-calientes", "Bebidas calientes", ordenCategoria++);
        producto(bebidasCalientes, "cafe-negro", "Café negro", null, 2000, false);
        producto(bebidasCalientes, "capuchino", "Capuchino", null, 4500, false);
        producto(bebidasCalientes, "chocolate", "Chocolate", null, 4500, false);
        producto(bebidasCalientes, "aromatica", "Aromática", null, 3000, false);
        categoriaRepository.save(bebidasCalientes);

        Categoria algoDulce = nuevaCategoria("algo-dulce", "Algo Dulce", ordenCategoria++);
        producto(algoDulce, "malteada-de-oreo", "Malteada de Oreo", null, 12000, false);
        producto(algoDulce, "malteada-de-vainilla", "Malteada de vainilla", null, 12000, false);
        producto(algoDulce, "malteada-de-choco-ramo", "Malteada de Choco Ramo", null, 14000, false);
        producto(algoDulce, "malteada-explosion-de-chocolate", "Malteada explosión de chocolate", null, 15000, true);
        producto(algoDulce, "frappe-de-cafe", "Frappé de café", null, 10000, false);
        categoriaRepository.save(algoDulce);

        Categoria jugos = nuevaCategoria("jugos-naturales", "Jugos naturales", ordenCategoria++);
        producto(jugos, "jugo-en-agua", "Jugo en agua",
            "Maracuyá, mora, tomate de árbol, fresa, guanábana o Milo.", 6000, false);
        producto(jugos, "jugo-en-leche", "Jugo en leche",
            "Maracuyá, mora, tomate de árbol, fresa, guanábana o Milo.", 7000, false);
        categoriaRepository.save(jugos);
    }

    private Categoria nuevaCategoria(String slug, String nombre, int orden) {
        Categoria categoria = new Categoria();
        categoria.setSlug(slug);
        categoria.setNombre(nombre);
        categoria.setOrden(orden);
        return categoria;
    }

    private void producto(Categoria categoria, String slug, String nombre, String descripcion, int precio, boolean destacado) {
        Producto producto = new Producto();
        producto.setSlug(slug);
        producto.setNombre(nombre);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setDestacado(destacado);
        producto.setOrden(categoria.getProductos().size());
        producto.setCategoria(categoria);
        categoria.getProductos().add(producto);
    }
}
