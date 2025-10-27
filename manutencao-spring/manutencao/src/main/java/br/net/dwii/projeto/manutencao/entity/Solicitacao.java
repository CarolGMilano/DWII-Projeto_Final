package br.net.dwii.projeto.manutencao.entity;

import java.sql.Date;

public class Solicitacao {
    private Long id;
    private String equipamento;
    private Categoria categoria;
    private String descricao;
    private Number status;
    private Cliente cliente;
    private Funcionario funcionario;
    private Historico historico[];
    private Date dataAbertura;
    private Orcamento orcamento;

    public Solicitacao(long id, String equipamento, Categoria categoria, String descricao, Number status,
            Cliente cliente, Historico[] historico, Date dataAbertura) {
        this.id = id;
        this.equipamento = equipamento;
        this.categoria = categoria;
        this.descricao = descricao;
        this.status = status;
        this.cliente = cliente;
        this.historico = historico;
        this.dataAbertura = dataAbertura;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEquipamento() {
        return equipamento;
    }

    public void setEquipamento(String equipamento) {
        this.equipamento = equipamento;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Number getStatus() {
        return status;
    }

    public void setStatus(Number status) {
        this.status = status;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Historico[] getHistorico() {
        return historico;
    }

    public void setHistorico(Historico[] historico) {
        this.historico = historico;
    }

    public Date getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(Date dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public Orcamento getOrcamento() {
        return orcamento;
    }

    public void setOrcamento(Orcamento orcamento) {
        this.orcamento = orcamento;
    }
}
