package br.net.dwii.projeto.manutencao.model.dto;

import java.time.LocalDateTime;

public class HistoricoDTO {
  private LocalDateTime dataHora;
  private int status;
  private FuncionarioResumoDTO funcionario;
  private FuncionarioResumoDTO funcionarioDestino;
  private String msgRejeicao;

  public HistoricoDTO(LocalDateTime dataHora, int status, FuncionarioResumoDTO funcionario, FuncionarioResumoDTO funcionarioDestino, String msgRejeicao) {
    this.dataHora = dataHora;
    this.status = status;
    this.funcionario = funcionario;
    this.funcionarioDestino = funcionarioDestino;
    this.msgRejeicao = msgRejeicao;
  }

  public LocalDateTime getDataHora() { return dataHora; }
  public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }

  public int getStatus() { return status; }
  public void setStatus(int status) { this.status = status; }

  public FuncionarioResumoDTO getFuncionario() { return funcionario; }
  public void setFuncionario(FuncionarioResumoDTO funcionario) { this.funcionario = funcionario; }

  public FuncionarioResumoDTO getFuncionarioDestino() { return funcionarioDestino; }
  public void setFuncionarioDestino(FuncionarioResumoDTO funcionarioDestino) { this.funcionarioDestino = funcionarioDestino; }

  public String getMsgRejeicao() { return msgRejeicao; }
  public void setMsgRejeicao(String msgRejeicao) { this.msgRejeicao = msgRejeicao; }
}