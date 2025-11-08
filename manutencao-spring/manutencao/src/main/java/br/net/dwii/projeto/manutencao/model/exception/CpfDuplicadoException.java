package br.net.dwii.projeto.manutencao.model.exception;

public class CpfDuplicadoException extends RuntimeException{
  public CpfDuplicadoException(String cpf) {
    super("O CPF " + cpf + " já foi cadastrado.");
  }
}
