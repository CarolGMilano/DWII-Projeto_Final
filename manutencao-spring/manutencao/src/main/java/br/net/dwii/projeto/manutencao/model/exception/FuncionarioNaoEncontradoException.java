package br.net.dwii.projeto.manutencao.model.exception;

public class FuncionarioNaoEncontradoException extends RuntimeException {
  public FuncionarioNaoEncontradoException() {
    super("Funcionario não encontrado");
  }
}