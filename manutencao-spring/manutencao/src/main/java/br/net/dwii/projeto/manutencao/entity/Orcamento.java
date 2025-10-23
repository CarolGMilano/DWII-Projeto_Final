package br.net.dwii.projeto.manutencao.entity;

public class Orcamento {
    public Long id;
    public long idSolicitacao;
    public Servico servico[];
    public Double valorTotal;
    public boolean aprovado;
    public String msgRejeicao;
}
