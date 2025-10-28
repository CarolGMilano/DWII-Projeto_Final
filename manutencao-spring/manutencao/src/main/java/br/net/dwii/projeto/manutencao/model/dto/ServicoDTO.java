package br.net.dwii.projeto.manutencao.model.dto;

public class ServicoDTO {
  private String descricao;
  private double preco;
  
  public ServicoDTO(String descricao, double preco) {
    this.descricao = descricao;
    this.preco = preco;
  }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public double getPreco() { return preco; }
  public void setPreco(double preco) { this.preco = preco; }
}