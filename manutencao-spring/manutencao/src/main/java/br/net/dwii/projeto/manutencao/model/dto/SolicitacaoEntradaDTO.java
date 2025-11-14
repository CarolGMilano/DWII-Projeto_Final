package br.net.dwii.projeto.manutencao.model.dto;

public class SolicitacaoEntradaDTO {
  private int id;
  private String equipamento;
  private int categoria;
  private String descricao;
  private OrcamentoDTO orcamento;
  private ManutencaoDTO manutencao;
  private int funcionario;
  private int cliente;
  
  public SolicitacaoEntradaDTO(int id, String equipamento, int categoria, String descricao, OrcamentoDTO orcamento, ManutencaoDTO manutencao, int funcionario, int cliente) {
    this.id = id;
    this.equipamento = equipamento;
    this.categoria = categoria;
    this.descricao = descricao;
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

  public OrcamentoDTO getOrcamento() { return orcamento; }
  public void setOrcamento(OrcamentoDTO orcamento) { this.orcamento = orcamento; }

  public ManutencaoDTO getManutencao() { return manutencao; }
  public void setManutencao(ManutencaoDTO manutencao) { this.manutencao = manutencao; }

  public int getFuncionario() { return funcionario; }
  public void setFuncionario(int funcionario) { this.funcionario = funcionario; }

  public int getCliente() { return cliente; }
  public void setCliente(int cliente) { this.cliente = cliente; }
}