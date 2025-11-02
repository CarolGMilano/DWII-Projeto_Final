package br.net.dwii.projeto.manutencao.model;

public class Usuario {
	private int id;
	private String nome;
	private String email;
	private String senha;
	private int tipo;
	private Boolean ativo;

	public Usuario (int id, String nome, String email, String senha, int tipo, Boolean ativo) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.tipo = tipo;
		this.ativo = ativo;
	}

	public Usuario (int id, String nome, String email, int tipo, Boolean ativo) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = null;
		this.tipo = tipo;
		this.ativo = ativo;
	}

	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getNome() { return nome; }
	public void setNome(String nome) { this.nome = nome; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getSenha() { return senha; }
	public void setSenha(String senha) { this.senha = senha; }

	public int getTipo() { return tipo; }
	public void setTipo(int tipo) { this.tipo = tipo; }

	public Boolean getAtivo() { return ativo; }
	public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}