package dev.java.Autoflex.exception;

public class ProductRawMaterialNotFoundException extends RuntimeException {

    public ProductRawMaterialNotFoundException() {
        super("Associação entre produto e matéria-prima não encontrada");
    }

    public ProductRawMaterialNotFoundException(String message) {
        super(message);
    }
}