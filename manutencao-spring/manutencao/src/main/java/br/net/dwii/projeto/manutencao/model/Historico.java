package br.net.dwii.projeto.manutencao.model;

import java.sql.Timestamp;

public class Historico {
  private int id;
  private int idSolicitacao;
  private Timestamp dataHora;
  private int idStatus;
  private Integer idFuncionario;
  private Integer idFuncionarioDestino;
  
  public Historico(int id, int idSolicitacao, Timestamp dataHora, int idStatus, Integer idFuncionario,
      Integer idFuncionarioDestino) {
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

  public Timestamp getDataHora() { return dataHora; }
  public void setDataHora(Timestamp dataHora) { this.dataHora = dataHora; }

  public int getIdStatus() { return idStatus; }
  public void setIdStatus(int idStatus) { this.idStatus = idStatus; }

  public Integer getIdFuncionario() { return idFuncionario; }
  public void setIdFuncionario(Integer idFuncionario) { this.idFuncionario = idFuncionario; }

  public Integer getIdFuncionarioDestino() { return idFuncionarioDestino; }
  public void setIdFuncionarioDestino(Integer idFuncionarioDestino) { this.idFuncionarioDestino = idFuncionarioDestino; }
}