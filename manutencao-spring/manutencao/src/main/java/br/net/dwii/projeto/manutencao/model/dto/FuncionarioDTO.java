package br.net.dwii.projeto.manutencao.model.dto;

import java.sql.Date;

public class FuncionarioDTO extends UsuarioDTO {
  private int idFuncionario;
  private Date dataNascimento;

  //Como eu tenho mais de um construtor, quando o json chega, ele não sabe qual usar, então precisa de um vazio.
  public FuncionarioDTO(){
    super();
  }

  public FuncionarioDTO(int idUsuario, String nome, String email, int tipo, int idFuncionario, Date dataNascimento) {
    super(idUsuario, nome, email, tipo);
    this.idFuncionario = idFuncionario;
    this.dataNascimento = dataNascimento;
  }

  public FuncionarioDTO(int idUsuario, String nome, String email, String senha, String novaSenha, int tipo, int idFuncionario, Date dataNascimento) {
    super(idUsuario, nome, email, senha, novaSenha, tipo);
    this.idFuncionario = idFuncionario;
    this.dataNascimento = dataNascimento;
  }

  public int getIdFuncionario() { return idFuncionario; }
  public void setIdFuncionario(int idFuncionario) { this.idFuncionario = idFuncionario; }

  public Date getDataNascimento() { return dataNascimento; }
  public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }

  @Override
  public String toString() {
    return "FuncionarioDTO [idFuncionario=" + idFuncionario + ", dataNascimento=" + dataNascimento + ", getIdUsuario()="
        + getIdUsuario() + ", getNome()=" + getNome() + ", getEmail()=" + getEmail() + ", getSenha()=" + getSenha()
        + ", getNovaSenha()=" + getNovaSenha() + "]";
  }
}
