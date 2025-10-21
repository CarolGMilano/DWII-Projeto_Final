package br.net.dwii.projeto.manutencao.models;

import javax.xml.crypto.Data;

import org.springframework.boot.autoconfigure.domain.EntityScan;

@Entity 
@Table(name = "historico")
public class Historico {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Number idSolicitacao;

    @Column
    private Data dataHora;

    @Column
    private Number status;

    @Column
    private Number idFuncionario;

    @Colunm 
    private Number idFuncionarioDestino;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Number getIdSolicitacao() {
        return idSolicitacao;
    }
    public void setIdSolicitacao(Number idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public Data getDataHora() {
        return dataHora;
    }
    public void setDataHora(Data dataHora) {
        this.dataHora = dataHora;
    }

    public Number getStatus() {
        return status;
    }
    public void setStatus(Number status) {
        this.status = status;
    }

    public Number getIdFuncionario() {
        return idFuncionario;
    }
    public void setIdFuncionario(Number idFuncionario) {
        this.idFuncionario = idFuncionario;
    }

    public Number getIdFuncionarioDestino() {
        return idFuncionarioDestino;
    }
    public void setIdFuncionarioDestino(Number idFuncionarioDestino) {
        this.idFuncionarioDestino = idFuncionarioDestino;
    }

}
