package dev.java.Autoflex.exception;

public class RawMaterialNotFoundException extends RuntimeException {
    public RawMaterialNotFoundException() {
        super("Matéria-prima não encontrada");
    }

    public RawMaterialNotFoundException(String message) {
        super(message);
    }
}