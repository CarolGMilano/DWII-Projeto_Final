package br.net.dwii.projeto.manutencao.model.exception;

public class SolicitacaoNaoEncontradaException extends RuntimeException {
  public SolicitacaoNaoEncontradaException() {
    super("Solicitação não encontrada");
  }
}
