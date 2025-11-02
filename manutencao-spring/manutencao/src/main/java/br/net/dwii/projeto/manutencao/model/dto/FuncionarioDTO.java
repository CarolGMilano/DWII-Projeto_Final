package br.net.dwii.projeto.manutencao.model.dto;

import java.sql.Date;

public class FuncionarioDTO extends UsuarioDTO {
  private int idFuncionario;
  private Date dataNascimento;

  public FuncionarioDTO(int idUsuario, String nome, String email, String senha, int tipo, int idFuncionario, Date dataNascimento) {
    super(idUsuario, nome, email, senha, tipo);
    this.idFuncionario = idFuncionario;
    this.dataNascimento = dataNascimento;
  }

  public int getIdFuncionario() { return idFuncionario; }
  public void setIdFuncionario(int idFuncionario) { this.idFuncionario = idFuncionario; }

  public Date getDataNascimento() { return dataNascimento; }
  public void setDataNascimento(Date dataNascimento) { this.dataNascimento = dataNascimento; }
}
