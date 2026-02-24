package dev.java.Autoflex.infra;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import dev.java.Autoflex.exception.InvalidProductException;
import dev.java.Autoflex.exception.ProductNotFoundException;
import dev.java.Autoflex.exception.InvalidRawMaterialException;
import dev.java.Autoflex.exception.RawMaterialNotFoundException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    private ResponseEntity<String> productNotFoundHandler(ProductNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
    @ExceptionHandler(InvalidProductException.class)
    private ResponseEntity<String> invalidProductException(InvalidProductException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
    @ExceptionHandler(RawMaterialNotFoundException.class)
    private ResponseEntity<String> rawMaterialNotFoundHandler(RawMaterialNotFoundException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
    @ExceptionHandler(InvalidRawMaterialException.class)
    private ResponseEntity<String> invalidRawMaterialException(InvalidRawMaterialException exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
    }
    
}
