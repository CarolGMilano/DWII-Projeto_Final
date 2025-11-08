package br.net.dwii.projeto.manutencao.model.dto;

public abstract class UsuarioDTO {
  private int idUsuario;
  private String nome;
  private String email;
  private String senha;
  private String novaSenha;
  private int tipo;

  public UsuarioDTO() {
  }

  public UsuarioDTO(int idUsuario, String nome, String email, int tipo){
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.tipo = tipo;
  }

  public UsuarioDTO(int idUsuario, String nome, String email, String senha, int tipo){
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
  }

  public UsuarioDTO(int idUsuario, String nome, String email, String senha, String novaSenha, int tipo){
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.novaSenha = novaSenha;
    this.tipo = tipo;
  }

  public int getIdUsuario() { return idUsuario; }
  public void setIdUsuario(int idUsuario) { this.idUsuario = idUsuario; }

  public String getNome() { return nome; }
  public void setNome(String nome) { this.nome = nome; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getSenha() { return senha; }
  public void setSenha(String senha) { this.senha = senha; }

  public String getNovaSenha() { return novaSenha; }
  public void setNovaSenha(String novaSenha) { this.novaSenha = novaSenha; }

  public int getTipo() { return tipo; }
  public void setTipo(int tipo) {   this.tipo = tipo; }
}
