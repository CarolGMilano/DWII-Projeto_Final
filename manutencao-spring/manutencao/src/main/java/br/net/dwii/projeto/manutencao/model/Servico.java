package br.net.dwii.projeto.manutencao.model;

public class Servico {
  private int id;
  private int idOrcamento;
  private String descricao;
  private double preco;

  public Servico(int id, int idOrcamento, String descricao, double preco) {
    this.id = id;
    this.idOrcamento = idOrcamento;
    this.descricao = descricao;
    this.preco = preco;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdOrcamento() { return idOrcamento; }
  public void setIdOrcamento(int idOrcamento) { this.idOrcamento = idOrcamento; }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public double getPreco() { return preco; }
  public void setPreco(double preco) { this.preco = preco; }
}