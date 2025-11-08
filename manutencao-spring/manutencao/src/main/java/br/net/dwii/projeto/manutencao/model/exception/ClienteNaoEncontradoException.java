package br.net.dwii.projeto.manutencao.model.exception;

public class ClienteNaoEncontradoException extends RuntimeException {
  public ClienteNaoEncontradoException() {
    super("Cliente não encontrado");
  }
}