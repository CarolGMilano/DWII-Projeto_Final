package br.net.dwii.projeto.manutencao.model;

public enum SolicitacaoStatusEnum {
  ABERTA(1),
  ORCADA(2),
  APROVADA(3),
  REJEITADA(4),
  REDIRECIONADA(5),
  ARRUMADA(6),
  PAGA(7),
  FINALIZADA(8);

  private final int valor;

  SolicitacaoStatusEnum(int valor) { this.valor = valor; }

  public int getValor() { return valor; }
}