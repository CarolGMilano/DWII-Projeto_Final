package br.net.dwii.projeto.manutencao.model.exception;

public class OrcamentoNaoEncontradoException extends RuntimeException {
  public OrcamentoNaoEncontradoException() {
    super("Orçamento não encontrada");
  }
}
