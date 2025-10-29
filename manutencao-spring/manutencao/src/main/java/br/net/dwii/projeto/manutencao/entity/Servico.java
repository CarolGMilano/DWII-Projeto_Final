package br.net.dwii.projeto.manutencao.entity;

public class Servico {
    private Long id;
    private String descricao;
    private Double valor;
    private long idOrcamento;

    public Servico(long id, String descricao, Double valor, long idOrcamento) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.idOrcamento = idOrcamento;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }
    public void setValor(Double valor) {
        this.valor = valor;
    }

    public long getIdOrcamento() {
        return idOrcamento;
    }

    public void setIdOrcamento(long idOrcamento) {
        this.idOrcamento = idOrcamento;
    }
}
