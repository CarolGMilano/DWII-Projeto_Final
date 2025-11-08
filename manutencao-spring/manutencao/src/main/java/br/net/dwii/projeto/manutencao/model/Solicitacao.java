package br.net.dwii.projeto.manutencao.model;

public class Solicitacao {
  private int id;
  private String equipamento;
  private int idCategoria;
  private String descricao;
  private int idStatus;
  private int idFuncionario;
  private int idCliente;

  public Solicitacao(int id, String equipamento, int idCategoria, String descricao, int idStatus, int idFuncionario, int idCliente) {
    this.id = id;
    this.equipamento = equipamento;
    this.idCategoria = idCategoria;
    this.descricao = descricao;
    this.idStatus = idStatus;
    this.idFuncionario = idFuncionario;
    this.idCliente = idCliente;
  }
  
  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public String getEquipamento() { return equipamento; }
  public void setEquipamento(String equipamento) { this.equipamento = equipamento; }

  public int getIdCategoria() { return idCategoria; }
  public void setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public int getIdStatus() { return idStatus; }
  public void setIdStatus(int idStatus) { this.idStatus = idStatus; }

  public int getIdFuncionario() { return idFuncionario; }
  public void setIdFuncionario(int idFuncionario) { this.idFuncionario = idFuncionario; }
  
  public int getIdCliente() { return idCliente; }
  public void setIdCliente(int idCliente) { this.idCliente = idCliente; }
}
