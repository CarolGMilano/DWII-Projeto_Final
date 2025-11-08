package br.net.dwii.projeto.manutencao.model.exception;

public class UsuarioNaoEncontradoException extends RuntimeException {
  public UsuarioNaoEncontradoException() {
    super("Usuário não encontrado");
  }
}