package br.net.dwii.projeto.manutencao.model;

import java.util.List;

public class Orcamento {
    public int id;
    public int idSolicitacao;
    public List<Servico> servico;
    public Double valorTotal;
    public boolean aprovado;
    public String msgRejeicao;
    
    public Orcamento(int id, int idSolicitacao, List<Servico> servico, Double valorTotal, boolean aprovado) {
        this.id = id;
        this.idSolicitacao = idSolicitacao;
        this.servico = servico;
        this.valorTotal = valorTotal;
        this.aprovado = aprovado;
        this.msgRejeicao = null;
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

    public List<Servico> getServico() {
        return servico;
    }

    public void setServico(List<Servico> servico) {
        this.servico = servico;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public boolean isAprovado() {
        return aprovado;
    }

    public void setAprovado(boolean aprovado) {
        this.aprovado = aprovado;
    }

    public String getMsgRejeicao() {
        return msgRejeicao;
    }

    public void setMsgRejeicao(String msgRejeicao) {
        this.msgRejeicao = msgRejeicao;
    }
}
