package dev.java.Autoflex.exception;

public class ProductRawMaterialAlreadyExistsException extends RuntimeException {

    public ProductRawMaterialAlreadyExistsException() {
        super("Associação entre produto e matéria-prima já existe");
    }

    public ProductRawMaterialAlreadyExistsException(String message) {
        super(message);
    }
}