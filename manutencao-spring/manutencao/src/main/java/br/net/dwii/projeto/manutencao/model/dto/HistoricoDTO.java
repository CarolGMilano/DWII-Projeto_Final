package br.net.dwii.projeto.manutencao.model.dto;

import java.sql.Timestamp;

public class HistoricoDTO {
  private Timestamp dataHora;
  private int status;
  private FuncionarioResumoDTO funcionario;
  private FuncionarioResumoDTO funcionarioDestino;

  public HistoricoDTO(Timestamp dataHora, int status, FuncionarioResumoDTO funcionario, FuncionarioResumoDTO funcionarioDestino) {
    this.dataHora = dataHora;
    this.status = status;
    this.funcionario = funcionario;
    this.funcionarioDestino = funcionarioDestino;
  }

  public Timestamp getDataHora() { return dataHora; }
  public void setDataHora(Timestamp dataHora) { this.dataHora = dataHora; }

  public int getStatus() { return status; }
  public void setStatus(int status) { this.status = status; }

  public FuncionarioResumoDTO getFuncionario() { return funcionario; }
  public void setFuncionario(FuncionarioResumoDTO funcionario) { this.funcionario = funcionario; }

  public FuncionarioResumoDTO getFuncionarioDestino() { return funcionarioDestino; }
  public void setFuncionarioDestino(FuncionarioResumoDTO funcionarioDestino) { this.funcionarioDestino = funcionarioDestino; }
}