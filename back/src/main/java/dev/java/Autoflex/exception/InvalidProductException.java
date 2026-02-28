package dev.java.Autoflex.exception;

public class InvalidProductException extends RuntimeException {
    public InvalidProductException() {
        super("Nome ou preço inválido(s)");
    }

    public InvalidProductException(String message) {
        super(message);
    }
}
