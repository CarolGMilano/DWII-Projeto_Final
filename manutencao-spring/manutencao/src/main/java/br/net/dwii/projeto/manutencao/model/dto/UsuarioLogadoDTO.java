package br.net.dwii.projeto.manutencao.model.dto;

public class UsuarioLogadoDTO {
  private int id;
  private int tipo;

  public UsuarioLogadoDTO(int id, int tipo) {
    this.id = id;
    this.tipo = tipo;
  }

  public int getId() { return id; }
  public int getTipo() { return tipo; }
}