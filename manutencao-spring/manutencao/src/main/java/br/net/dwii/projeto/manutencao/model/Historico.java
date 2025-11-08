package br.net.dwii.projeto.manutencao.model;

import java.sql.Date;

public class Historico {
    private int id;
    private int idSolicitacao;
    private Date dataHora;
    private int status;
    private Funcionario funcionario;
    private Funcionario funcionarioDestino;

    public Historico(int id, int idSolicitacao, Date dataHora, int status, Funcionario funcionario, Funcionario funcionarioDestino) {
        this.id = id;
        this.idSolicitacao = idSolicitacao;
        this.dataHora = dataHora;
        this.status = status;
        this.funcionario = funcionario;
        this.funcionarioDestino = funcionarioDestino;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(int idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public Date getDataHora() {
        return dataHora;
    }

    public void setDataHora(Date dataHora) {
        this.dataHora = dataHora;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
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
