package com.juznacrewga.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

/** Turns errors into clear JSON responses with the right status code. */
@RestControllerAdvice
public class ApiExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ApiExceptionHandler.class);

    /** Invalid form input: 400 with { field: problem } */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> invalid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return ResponseEntity.badRequest().body(errors);
    }

    /** The message was saved, but Gmail refused to send it (wrong app password, no internet...) */
    @ExceptionHandler(MailException.class)
    public ResponseEntity<Map<String, String>> mailFailed(MailException ex) {
        log.error("Could not send the contact email", ex);
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(Map.of("error", "email could not be sent"));
    }
}
