package br.net.dwii.projeto.manutencao.model.dto;

import java.sql.Timestamp;

public class SolicitacaoResumoDTO {
  private int id;
  private String equipamento;
  private int status;
  private Timestamp dataAbertura;
  private ClienteResumoDTO cliente;

  public SolicitacaoResumoDTO(int id, String equipamento, int status, Timestamp dataAbertura, ClienteResumoDTO cliente) {
    this.id = id;
    this.equipamento = equipamento;
    this.status = status;
    this.dataAbertura = dataAbertura;
    this.cliente = cliente;
  }
  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public String getEquipamento() { return equipamento; }
  public void setEquipamento(String equipamento) { this.equipamento = equipamento; }

  public ClienteResumoDTO getCliente() { return cliente; }
  public void setCliente(ClienteResumoDTO cliente) { this.cliente = cliente; }

  public int getStatus() { return status; }
  public void setStatus(int status) { this.status = status; }
  
  public Timestamp getDataAbertura() { return dataAbertura; }
  public void setDataAbertura(Timestamp dataAbertura) { this.dataAbertura = dataAbertura; }
}