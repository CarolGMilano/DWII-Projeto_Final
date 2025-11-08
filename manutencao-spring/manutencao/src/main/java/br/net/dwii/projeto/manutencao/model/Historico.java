package br.net.dwii.projeto.manutencao.model;

import java.sql.Date;

public class Historico {
  private int id;
  private int idSolicitacao;
  private Date dataHora;
  private int idStatus;
  private int idFuncionario;
  private int idFuncionarioDestino;
  
  public Historico(int id, int idSolicitacao, Date dataHora, int idStatus, int idFuncionario,
      int idFuncionarioDestino) {
    this.id = id;
    this.idSolicitacao = idSolicitacao;
    this.dataHora = dataHora;
    this.idStatus = idStatus;
    this.idFuncionario = idFuncionario;
    this.idFuncionarioDestino = idFuncionarioDestino;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdSolicitacao() { return idSolicitacao; }
  public void setIdSolicitacao(int idSolicitacao) { this.idSolicitacao = idSolicitacao; }

  public Date getDataHora() { return dataHora; }
  public void setDataHora(Date dataHora) { this.dataHora = dataHora; }

  public int getIdStatus() { return idStatus; }
  public void setIdStatus(int idStatus) { this.idStatus = idStatus; }

  public int getIdFuncionario() { return idFuncionario; }
  public void setIdFuncionario(int idFuncionario) { this.idFuncionario = idFuncionario; }

  public int getIdFuncionarioDestino() { return idFuncionarioDestino; }
  public void setIdFuncionarioDestino(int idFuncionarioDestino) { this.idFuncionarioDestino = idFuncionarioDestino; }
}