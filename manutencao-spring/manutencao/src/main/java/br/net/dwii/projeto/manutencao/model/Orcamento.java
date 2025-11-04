package br.net.dwii.projeto.manutencao.model;

import java.util.List;

public class Orcamento {
    public Long id;
    public long idSolicitacao;
    public List<Servico> servico;
    public Double valorTotal;
    public boolean aprovado;
    public String msgRejeicao;
    
    public Orcamento(long id, long idSolicitacao, List<Servico> servico, Double valorTotal, boolean aprovado,
            String msgRejeicao) {
        this.id = id;
        this.idSolicitacao = idSolicitacao;
        this.servico = servico;
        this.valorTotal = valorTotal;
        this.aprovado = aprovado;
        this.msgRejeicao = msgRejeicao;
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
