package br.net.dwii.projeto.manutencao.model.dto;

public class ClienteResumoDTO {
  private String nome;
  private String email;
  private String cpf;
  private String telefone;
  private EnderecoDTO endereco;
  
  public ClienteResumoDTO(String nome, String cpf, String telefone, EnderecoDTO endereco) {
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
  }

  public ClienteResumoDTO(String nome, String email, String cpf, String telefone, EnderecoDTO endereco) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
  }

  public String getNome() { return nome; }
  public void setNome(String nome) { this.nome = nome; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getCpf() { return cpf; }
  public void setCpf(String cpf) { this.cpf = cpf; }

  public String getTelefone() { return telefone; }
  public void setTelefone(String telefone) { this.telefone = telefone; }

  public EnderecoDTO getEndereco() { return endereco; }
  public void setEndereco(EnderecoDTO endereco) { this.endereco = endereco; }
}
