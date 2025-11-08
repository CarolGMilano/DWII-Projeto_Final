package br.net.dwii.projeto.manutencao.model.dto;

public class ClienteDTO extends UsuarioDTO {
  private String cpf;
  private String telefone;
  private EnderecoDTO endereco; 

  public ClienteDTO(int id, String nome, String email, int tipo, String cpf, String telefone, EnderecoDTO endereco) {
    super(id, nome, email, tipo);
    this.cpf = cpf;
    this.telefone = telefone;
    this.endereco = endereco;
  }

  public String getCpf() { return cpf; }
  public void setCpf(String cpf) { this.cpf = cpf; }

  public String getTelefone() { return telefone; }
  public void setTelefone(String telefone) { this.telefone = telefone; }

  public EnderecoDTO getEndereco() { return endereco; }
  public void setEndereco(EnderecoDTO endereco) { this.endereco = endereco; }
}