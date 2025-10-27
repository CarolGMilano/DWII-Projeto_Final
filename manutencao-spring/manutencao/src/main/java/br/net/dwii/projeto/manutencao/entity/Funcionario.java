package br.net.dwii.projeto.manutencao.entity;

import java.sql.Date;

public class Funcionario extends Usuario {
    private Number codigo;
    private Date dataNascimento;
    
    public Funcionario(long id, String nome, String email, String senha, Number tipo, Number codigo, Date dataNascimento) {
        super(id, nome, email, senha, tipo);
        this.codigo = codigo;
        this.dataNascimento = dataNascimento;   
    }

    public Number getCodigo() {
        return codigo;
    }
    public void setCodigo(Number codigo) {
        this.codigo = codigo;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }
    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    
}
