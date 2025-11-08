package br.net.dwii.projeto.manutencao.model.exception;

public class EnderecoNaoEncontradoException  extends RuntimeException {
  public EnderecoNaoEncontradoException() {
    super("Endereco não encontrado");
  }
}