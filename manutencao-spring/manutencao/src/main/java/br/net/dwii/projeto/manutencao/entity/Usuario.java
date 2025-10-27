package br.net.dwii.projeto.manutencao.entity;

public abstract class Usuario {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private Number tipo; // 1 - Cliente | 2 - Funcionario

    public Usuario(long id, String nome, String email, String senha, Number tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }
    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Number getTipo() {
        return tipo;
    }
    public void setTipo(Number tipo) {
        this.tipo = tipo;
    }
    
}
