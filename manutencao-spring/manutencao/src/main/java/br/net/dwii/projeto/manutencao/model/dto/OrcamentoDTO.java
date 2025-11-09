package br.net.dwii.projeto.manutencao.model.dto;

import java.util.List;

public class OrcamentoDTO {
  private List<ServicoDTO> servicos;
  private double valorTotal;
  private Boolean aprovada;
  private String msgRejeicao;
  private int id;

  public OrcamentoDTO(int id, List<ServicoDTO> servicos, double valorTotal, Boolean aprovada, String msgRejeicao) {
    this.servicos = servicos;
    this.valorTotal = valorTotal;
    this.aprovada = aprovada;
    this.msgRejeicao = msgRejeicao;
    this.id = id;
  }

  public List<ServicoDTO> getServicos() { return servicos; }
  public void setServicos(List<ServicoDTO> servicos) { this.servicos = servicos; }

  public double getValorTotal() { return valorTotal; }
  public void setValorTotal(double valorTotal) { this.valorTotal = valorTotal; }

  public Boolean getAprovada() { return aprovada; }
  public void setAprovada(Boolean aprovada) { this.aprovada = aprovada; }

  public String getMsgRejeicao() { return msgRejeicao; }
  public void setMsgRejeicao(String msgRejeicao) { this.msgRejeicao = msgRejeicao; }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}