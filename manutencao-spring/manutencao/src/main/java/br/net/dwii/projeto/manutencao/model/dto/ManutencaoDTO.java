package br.net.dwii.projeto.manutencao.model.dto;

public class ManutencaoDTO {
  private String descricao;
  private String orientacoes;

  public ManutencaoDTO(String descricao, String orientacoes) {
    this.descricao = descricao;
    this.orientacoes = orientacoes;
  }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public String getOrientacoes() { return orientacoes; }
  public void setOrientacoes(String orientacoes) { this.orientacoes = orientacoes; }
}
