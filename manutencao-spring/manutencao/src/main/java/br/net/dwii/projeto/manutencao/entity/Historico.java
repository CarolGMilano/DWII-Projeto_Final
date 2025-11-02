package br.net.dwii.projeto.manutencao.entity;

import java.sql.Date;

import br.net.dwii.projeto.manutencao.model.Funcionario;

public class Historico {
    private Long id;
    private long idSolicitacao;
    private Date dataHora;
    private Number status;
    private Funcionario funcionario;
    private Funcionario funcionarioDestino;

    public Historico(Long id, long idSolicitacao, Date dataHora, Number status, Funcionario funcionario, Funcionario funcionarioDestino) {
        this.id = id;
        this.idSolicitacao = idSolicitacao;
        this.dataHora = dataHora;
        this.status = status;
        this.funcionario = funcionario;
        this.funcionarioDestino = funcionarioDestino;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(long idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public Date getDataHora() {
        return dataHora;
    }

    public void setDataHora(Date dataHora) {
        this.dataHora = dataHora;
    }

    public Number getStatus() {
        return status;
    }

    public void setStatus(Number status) {
        this.status = status;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Funcionario getFuncionarioDestino() {
        return funcionarioDestino;
    }

    public void setFuncionarioDestino(Funcionario funcionarioDestino) {
        this.funcionarioDestino = funcionarioDestino;
    }
}
