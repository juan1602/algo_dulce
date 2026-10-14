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

        Categoria hamburguesas = nuevaCategoria("hamburguesas", "Hamburguesas", ordenCategoria++);
        producto(hamburguesas, "clasica", "Clásica",
            "Carne ahumada, queso mozzarella, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            16000, true);
        producto(hamburguesas, "new-york-burger", "New York Burger",
            "Carne ahumada, queso mozzarella, tocineta, chorizo, aros de cebolla, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            20000, false);
        producto(hamburguesas, "costena", "Costeña",
            "Carne ahumada, queso mozzarella, tocineta, queso costeño asado, maduro frito, cebolla grille, tomate y pan brioche sellado en mantequilla, acompañada de papas francesas.",
            20000, true);
        producto(hamburguesas, "mixta", "Mixta",
            "Carne ahumada, queso mozzarella, tocineta, pechuga a la plancha, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            20000, false);
        producto(hamburguesas, "manzana", "Manzana",
            "Carne ahumada, queso mozzarella, tocineta, maduro asado, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            20000, false);
        producto(hamburguesas, "smoking-burger", "Smoking Burger",
            "Carne ahumada, queso mozzarella, tocineta, bondiola de cerdo desmechada, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            22000, false);
        producto(hamburguesas, "chicken-burger", "Chicken Burger",
            "Carne ahumada, queso mozzarella, tocineta, pollo desmechado bañado en salsa tártara, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            22000, true);
        producto(hamburguesas, "doble-piso", "Doble Piso",
            "Carne ahumada x2, queso mozzarella, tocineta x2, vegetales frescos, pan brioche sellado en mantequilla, acompañada de papas francesas.",
            23000, false);
        categoriaRepository.save(hamburguesas);

        Categoria papas = nuevaCategoria("papas", "Papas", ordenCategoria++);
        producto(papas, "salchipapa", "Salchipapa", "Papas francesas, salchicha, queso rayado.", 15000, false);
        producto(papas, "salchi-choripapa", "Salchi-Choripapa", "Papas francesas, salchicha, chorizo, queso rayado.", 18000, false);
        producto(papas, "desgranado", "Desgranado",
            "Papas francesas, pollo desmechado, salchicha, maíz, queso mozzarella.", 22000, false);
        producto(papas, "morrongo", "Morrongo",
            "Papas francesas, trocitos de pollo y carne de res, salchicha, cebolla grille, queso mozzarella o rayado y maíz.",
            22000, false);
        producto(papas, "recerda", "Recerda",
            "Papas francesas, bondiola de cerdo desmechada, salchicha, maduro, queso mozzarella y maíz.", 22000, false);
        categoriaRepository.save(papas);

        Categoria sandwiches = nuevaCategoria("sandwiches", "Sándwiches", ordenCategoria++);
        producto(sandwiches, "sandwich-pollo", "Pollo",
            "Pan cubano, pollo desmechado, queso mozzarella, tocineta, tomate y cebolla grille, acompañado de papas francesas.",
            16000, false);
        producto(sandwiches, "sandwich-cerdo", "Cerdo",
            "Pan cubano, bondiola de cerdo desmechada, queso mozzarella, tocineta, tomate y cebolla grille, acompañado de papas francesas.",
            16000, false);
        categoriaRepository.save(sandwiches);

        Categoria perros = nuevaCategoria("perros", "Perros", ordenCategoria++);
        producto(perros, "perro-clasico", "Perro Clásico",
            "Pan brioche, salchicha, cebolla grille, paparipo, queso mozzarella, tocineta, acompañado de papas francesas.",
            15000, false);
        producto(perros, "perro-burger", "Perro Burger",
            "Pan brioche, salchicha, carne de hamburguesa picada, cebolla grille, paparipo, queso mozzarella, tocineta, acompañado de papas francesas.",
            20000, false);
        producto(perros, "perro-chancho", "Perro Chancho",
            "Pan brioche, salchicha, bondiola de cerdo desmechada, cebolla grille, maduro, paparipo, queso mozzarella, tocineta, acompañado de papas francesas.",
            20000, false);
        producto(perros, "perro-pic-pio", "Perro Pic Pio",
            "Pan brioche, salchicha, pollo desmechado bañado en tártara, paparipo, cebolla grille, queso mozzarella, tocineta, acompañado de papas francesas.",
            20000, false);
        producto(perros, "bebe-xl", "Bebé XL",
            "Pan de 29 cm, salchicha, proteína de su preferencia (pollo desmechado, bondiola de cerdo desmechada o carne de hamburguesa picada), cebolla grille, paparipo, queso mozzarella, tocineta, acompañado de papas francesas.",
            25000, false);
        categoriaRepository.save(perros);

        Categoria adicionales = nuevaCategoria("adicionales", "Adicionales", ordenCategoria++);
        producto(adicionales, "huevo-frito", "Huevo frito", null, 1500, false);
        producto(adicionales, "queso-frito", "Queso frito", null, 2500, false);
        producto(adicionales, "maduro-frito", "Maduro frito", null, 2500, false);
        producto(adicionales, "aros-cebolla", "Aros de cebolla x3", null, 2500, false);
        producto(adicionales, "maiz", "Maíz", null, 3000, false);
        producto(adicionales, "chorizo", "Chorizo", null, 3000, false);
        producto(adicionales, "tocineta", "Tocineta x3", null, 3000, false);
        producto(adicionales, "enchuladas", "Enchuladas", null, 2000, false);
        producto(adicionales, "pollo-desmechado", "Pollo desmechado", null, 5000, false);
        producto(adicionales, "pechuga-plancha", "Pechuga a la plancha", null, 8000, false);
        producto(adicionales, "bondiola-cerdo", "Bondiola de cerdo", null, 6000, false);
        producto(adicionales, "carne-hamburguesa", "Carne de hamburguesa", null, 8000, false);
        producto(adicionales, "papas-francesas-add", "Papas francesas", null, 8000, false);
        categoriaRepository.save(adicionales);

        Categoria entradas = nuevaCategoria("entradas", "Entradas", ordenCategoria++);
        producto(entradas, "papas-enchuladas", "Papas enchuladas", null, 11000, false);
        producto(entradas, "maduro-queso-rayado", "Maduro con queso rayado", null, 8000, false);
        categoriaRepository.save(entradas);

        Categoria bebidas = nuevaCategoria("bebidas", "Bebidas", ordenCategoria++);
        producto(bebidas, "cocacola-personal", "Coca-Cola personal", null, 3500, false);
        producto(bebidas, "cuatro-personal", "Cuatro personal", null, 3500, false);
        producto(bebidas, "hit-personal", "Hit personal", null, 3500, false);
        producto(bebidas, "agua", "Botella de agua", null, 3000, false);
        producto(bebidas, "agua-gas", "Botella de agua con gas", null, 3500, false);
        producto(bebidas, "soda", "Soda", null, 3000, false);
        producto(bebidas, "cerveza", "Cerveza", null, 4000, false);
        producto(bebidas, "cocacola-1-5l", "Coca-Cola 1.5L", null, 7000, false);
        producto(bebidas, "cuatro-1-5l", "Cuatro 1.5L", null, 7000, false);
        categoriaRepository.save(bebidas);
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
