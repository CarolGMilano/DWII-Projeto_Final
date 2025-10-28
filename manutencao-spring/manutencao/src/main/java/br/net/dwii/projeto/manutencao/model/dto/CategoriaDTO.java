package br.net.dwii.projeto.manutencao.model.dto;

public class CategoriaDTO {
  private int id;
  private String descricao;
  
  public CategoriaDTO(int id, String descricao) {
    this.id = id;
    this.descricao = descricao;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }
}