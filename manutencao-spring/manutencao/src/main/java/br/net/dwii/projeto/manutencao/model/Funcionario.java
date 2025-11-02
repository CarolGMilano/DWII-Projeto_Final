package br.net.dwii.projeto.manutencao.model;

import java.sql.Date;

public class Funcionario {
  private int id;
  private int idUsuario;
  private Date dataNascimento;

  public Funcionario(int id, int idUsuario, Date dataNascimento) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.dataNascimento = dataNascimento;
  }
  
  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdUsuario() { return idUsuario; }
  public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

  public Date getDataNascimento() { return dataNascimento; }
  public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }
}
