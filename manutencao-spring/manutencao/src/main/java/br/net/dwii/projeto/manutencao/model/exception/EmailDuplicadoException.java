package br.net.dwii.projeto.manutencao.model.exception;

public class EmailDuplicadoException extends RuntimeException {
  public EmailDuplicadoException(String email) {
    super("O email " + email + " já foi cadastrado.");
  }
}
