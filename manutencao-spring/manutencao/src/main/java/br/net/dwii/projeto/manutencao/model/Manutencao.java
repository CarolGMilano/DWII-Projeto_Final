package br.net.dwii.projeto.manutencao.model;

public class Manutencao {
  private int id;
  private int idSolicitacao;
  private String descricao;
  private String orientacao;

  public Manutencao(int id, int idSolicitacao, String descricao, String orientacao) {
    this.id = id;
    this.idSolicitacao = idSolicitacao;
    this.descricao = descricao;
    this.orientacao = orientacao;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdSolicitacao() { return idSolicitacao; }
  public void setIdSolicitacao(int idSolicitacao) { this.idSolicitacao = idSolicitacao;}

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public String getOrientacao() { return orientacao; }
  public void setOrientacao(String orientacao) { this.orientacao = orientacao; }
}