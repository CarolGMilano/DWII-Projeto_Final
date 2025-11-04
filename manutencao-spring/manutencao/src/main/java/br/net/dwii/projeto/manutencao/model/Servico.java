package br.net.dwii.projeto.manutencao.model;

public class Servico {
    private Long id;
    private String descricao;
    private Double valor;
    private Long idOrcamento;

    public Servico(Long id, String descricao, Double valor, Long idOrcamento) {
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

    public Long getIdOrcamento() {
        return idOrcamento;
    }

    public void setIdOrcamento(Long idOrcamento) {
        this.idOrcamento = idOrcamento;
    }
}
