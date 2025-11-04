package br.net.dwii.projeto.manutencao.model;

public class Endereco {
  private int id;
  private int idCliente;
  private String cep;
  private String logradouro;
  private int numero;
  private String bairro;
  private String cidade;
  private String estado;

  public Endereco(int id, int idCliente, String cep, String logradouro, int numero, String bairro, String cidade, String estado) {
    this.id = id;
    this.idCliente = idCliente;
    this.cep = cep;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }

  public int getId() { return id; }
  public void setId(int id) { this.id = id; }

  public int getIdCliente() { return idCliente; }
  public void setIdCliente(int idCliente) { this.idCliente = idCliente; }

  public String getCep() { return cep; }
  public void setCep(String cep) { this.cep = cep; }

  public String getLogradouro() { return logradouro; }
  public void setLogradouro(String logradouro) { this.logradouro = logradouro; }

  public int getNumero() { return numero; }
  public void setNumero(int numero) { this.numero = numero; }

  public String getBairro() { return bairro; }
  public void setBairro(String bairro) { this.bairro = bairro; }

  public String getCidade() { return cidade; }
  public void setCidade(String cidade) { this.cidade = cidade; }

  public String getEstado() { return estado; }
  public void setEstado(String estado) { this.estado = estado; }
}
