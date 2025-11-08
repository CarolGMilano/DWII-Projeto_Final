package br.net.dwii.projeto.manutencao.model;

import java.sql.Date;
import java.util.List;

public class Solicitacao {
    private int id;
    private String equipamento;
    private Categoria categoria;
    private String descricao;
    private int status;
    private Cliente cliente;
    private Funcionario funcionario;
    private List<Historico> historico;
    private Date dataAbertura;
    private Orcamento orcamento;

    public Solicitacao(int id, String equipamento, Categoria categoria, String descricao, int status,
            Cliente cliente, Funcionario funcionario, Date dataAbertura) {
        this.id = id;
        this.equipamento = equipamento;
        this.categoria = categoria;
        this.descricao = descricao;
        this.status = status;
        this.cliente = cliente;
        this.funcionario = funcionario;
        this.dataAbertura = dataAbertura;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
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

    public List<Historico> getHistorico() {
        return historico;
    }

    public void setHistorico(List<Historico> historico) {
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
