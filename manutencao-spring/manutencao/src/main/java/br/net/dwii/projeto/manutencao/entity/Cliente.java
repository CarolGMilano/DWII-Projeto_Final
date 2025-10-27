package br.net.dwii.projeto.manutencao.entity;

public class Cliente extends Usuario {
    private String cpf;
    private String telefone;
    private Endereco endereco;

    public Cliente(long id, String nome, String email, String senha, Number tipo, String cpf, String telefone, Endereco endereco) {
        super(id, nome, email, senha, tipo);
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public String getCpf() {
        return cpf;
    }
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }
    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Endereco getEndereco() {
        return endereco;
    }
    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }   
    
}
