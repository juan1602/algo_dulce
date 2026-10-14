package com.algodulce.backend.util;

public final class Textos {

    private Textos() {
    }

    public static String generarSlug(String texto) {
        String sinAcentos = texto.toLowerCase()
            .replace("á", "a")
            .replace("é", "e")
            .replace("í", "i")
            .replace("ó", "o")
            .replace("ú", "u")
            .replace("ñ", "n");

        return sinAcentos
            .replaceAll("[^a-z0-9 ]", "")
            .trim()
            .replaceAll("\\s+", "-");
    }
}
