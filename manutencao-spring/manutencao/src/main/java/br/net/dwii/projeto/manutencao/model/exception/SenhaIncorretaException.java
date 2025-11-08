package br.net.dwii.projeto.manutencao.model.exception;

public class SenhaIncorretaException extends RuntimeException {
  public SenhaIncorretaException() {
    super("Senha incorreta");
  }
}