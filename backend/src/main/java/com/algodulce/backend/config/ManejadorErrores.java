package com.algodulce.backend.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class ManejadorErrores {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> archivoMuyPesado(MaxUploadSizeExceededException excepcion) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
            .body(Map.of("error", "La imagen es muy pesada. El máximo permitido es 8 MB."));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> errorConMensaje(ResponseStatusException excepcion) {
        String mensaje = excepcion.getReason() != null ? excepcion.getReason() : excepcion.getMessage();
        return ResponseEntity.status(excepcion.getStatusCode())
            .body(Map.of("error", mensaje));
    }
}
