package br.net.dwii.projeto.manutencao.model.dto;

import java.sql.Date;

public class HistoricoDTO {
  private Date dataHora;
  private int status;
  private FuncionarioResumoDTO funcionario;
  private FuncionarioResumoDTO funcionarioDestino;

  public HistoricoDTO(Date dataHora, int status, FuncionarioResumoDTO funcionario, FuncionarioResumoDTO funcionarioDestino) {
    this.dataHora = dataHora;
    this.status = status;
    this.funcionario = funcionario;
    this.funcionarioDestino = funcionarioDestino;
  }

  public Date getDataHora() { return dataHora; }
  public void setDataHora(Date dataHora) { this.dataHora = dataHora; }

  public int getStatus() { return status; }
  public void setStatus(int status) { this.status = status; }

  public FuncionarioResumoDTO getFuncionario() { return funcionario; }
  public void setFuncionario(FuncionarioResumoDTO funcionario) { this.funcionario = funcionario; }

  public FuncionarioResumoDTO getFuncionarioDestino() { return funcionarioDestino; }
  public void setFuncionarioDestino(FuncionarioResumoDTO funcionarioDestino) { this.funcionarioDestino = funcionarioDestino; }
}