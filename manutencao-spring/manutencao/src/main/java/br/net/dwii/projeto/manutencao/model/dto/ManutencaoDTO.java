package br.net.dwii.projeto.manutencao.model.dto;

public class ManutencaoDTO {
  private String descricao;
  private String orientacao;

  public ManutencaoDTO(String descricao, String orientacao) {
    this.descricao = descricao;
    this.orientacao = orientacao;
  }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public String getOrientacao() { return orientacao; }
  public void setOrientacao(String orientacao) { this.orientacao = orientacao; }
}
