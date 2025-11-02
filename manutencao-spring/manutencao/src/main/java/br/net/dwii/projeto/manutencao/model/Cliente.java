package br.net.dwii.projeto.manutencao.model;

public class Cliente {
  private int id;
  private int idUsuario;
  private String cpf;
  private String telefone;

  public Cliente(int id, int idUsuario, String cpf, String telefone) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.cpf = cpf;
    this.telefone = telefone;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdUsuario() { return idUsuario; }
  public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

  public String getCpf() { return cpf; }
  public void setCpf(String cpf) { this.cpf = cpf; }

  public String getTelefone() { return telefone; }
  public void setTelefone(String telefone) { this.telefone = telefone; }
}