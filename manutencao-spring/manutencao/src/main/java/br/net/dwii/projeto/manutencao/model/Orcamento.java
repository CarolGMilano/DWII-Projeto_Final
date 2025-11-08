package br.net.dwii.projeto.manutencao.model;

public class Orcamento {
  public int id;
  public int idSolicitacao;
  public double valorTotal;
  public Boolean aprovado; //Boolean, pois ele aceita null; boolean, com letra minúscula, não aceita null.
  public String msgRejeicao;
  
  public Orcamento(int id, int idSolicitacao, double valorTotal, Boolean aprovado, String msgRejeicao) {
    this.id = id;
    this.idSolicitacao = idSolicitacao;
    this.valorTotal = valorTotal;
    this.aprovado = aprovado;
    this.msgRejeicao = msgRejeicao;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdSolicitacao() { return idSolicitacao; }
  public void setIdSolicitacao(int idSolicitacao) { this.idSolicitacao = idSolicitacao; }

  public double getValorTotal() { return valorTotal; }
  public void setValorTotal(double valorTotal) { this.valorTotal = valorTotal; }

  public Boolean getAprovado() { return aprovado; }
  public void setAprovado(Boolean aprovado) { this.aprovado = aprovado; }

  public String getMsgRejeicao() { return msgRejeicao; }
  public void setMsgRejeicao(String msgRejeicao) { this.msgRejeicao = msgRejeicao; }
}