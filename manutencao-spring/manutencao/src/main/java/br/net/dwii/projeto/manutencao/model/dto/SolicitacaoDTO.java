package br.net.dwii.projeto.manutencao.model.dto;

import java.util.List;

public class SolicitacaoDTO {
  private int id;
  private String equipamento;
  private int categoria;
  private String descricao;
  private int status;
  private List<HistoricoDTO> historico;
  private OrcamentoDTO orcamento;
  private ManutencaoDTO manutencao;
  private FuncionarioResumoDTO funcionario;
  private ClienteResumoDTO cliente;

  public SolicitacaoDTO(int id, String equipamento, int categoria, String descricao, int status, List<HistoricoDTO> historico, OrcamentoDTO orcamento, ManutencaoDTO manutencao, FuncionarioResumoDTO funcionario, ClienteResumoDTO cliente) {
    this.id = id;
    this.equipamento = equipamento;
    this.categoria = categoria;
    this.descricao = descricao;
    this.status = status;
    this.historico = historico;
    this.orcamento = orcamento;
    this.manutencao = manutencao;
    this.funcionario = funcionario;
    this.cliente = cliente;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public String getEquipamento() { return equipamento; }
  public void setEquipamento(String equipamento) { this.equipamento = equipamento; }

  public int getCategoria() { return categoria; }
  public void setCategoria(int categoria) { this.categoria = categoria; }

  public String getDescricao() { return descricao; }
  public void setDescricao(String descricao) { this.descricao = descricao; }

  public int getStatus() { return status; }
  public void setStatus(int status) { this.status = status; }

  public List<HistoricoDTO> getHistorico() { return historico; }
  public void setHistorico(List<HistoricoDTO> historico) { this.historico = historico; }

  public OrcamentoDTO getOrcamento() { return orcamento; }
  public void setOrcamento(OrcamentoDTO orcamento) { this.orcamento = orcamento; }

  public ManutencaoDTO getManutencao() { return manutencao; }
  public void setManutencao(ManutencaoDTO manutencao) { this.manutencao = manutencao; }

  public FuncionarioResumoDTO getFuncionario() { return funcionario; }
  public void setFuncionario(FuncionarioResumoDTO funcionario) { this.funcionario = funcionario; }

  public ClienteResumoDTO getCliente() { return cliente; }
  public void setCliente(ClienteResumoDTO cliente) { this.cliente = cliente; }
}