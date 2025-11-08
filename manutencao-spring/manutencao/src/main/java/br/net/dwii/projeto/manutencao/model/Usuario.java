package br.net.dwii.projeto.manutencao.model;

public class Usuario {
	private int id;
	private String nome;
	private String email;
	private String senha;
	private String salt;
	private int tipo;
	private Boolean ativo;

	public Usuario (int id, String nome, String email, String senha, String salt, int tipo, Boolean ativo) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.salt = salt;
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

	public String getSalt() { return salt; }
	public void setSalt(String salt) { this.salt = salt; }

	public int getTipo() { return tipo; }
	public void setTipo(int tipo) { this.tipo = tipo; }

	public Boolean getAtivo() { return ativo; }
	public void setAtivo(Boolean ativo) { this.ativo = ativo; }

	@Override
	public String toString() {
		return "Usuario [id=" + id + ", nome=" + nome + ", email=" + email + ", senha=" + senha + ", salt=" + salt
				+ ", tipo=" + tipo + ", ativo=" + ativo + "]";
	}
}