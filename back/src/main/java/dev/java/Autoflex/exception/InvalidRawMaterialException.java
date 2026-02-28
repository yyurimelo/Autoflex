package dev.java.Autoflex.exception;

public class InvalidRawMaterialException extends RuntimeException {
    public InvalidRawMaterialException() {
        super("Nome ou quantidade em estoque inválido(s)");
    }

    public InvalidRawMaterialException(String message) {
        super(message);
    }
}