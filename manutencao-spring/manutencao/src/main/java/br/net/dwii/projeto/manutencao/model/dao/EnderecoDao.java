package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Endereco;

//Indica para o Spring que essa é uma classe de acesso ao banco de dados.
@Repository
public class EnderecoDao {
  private final String inserir = "INSERT INTO endereco (idCliente, cep, logradouro, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?)";
  private final String consultar = "SELECT id, idCliente, cep, logradouro, numero, bairro, cidade, estado FROM endereco WHERE idCliente = ?";

  public void inserir(Endereco endereco) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, endereco.getIdCliente());
      psInserir.setString(2, endereco.getCep());
      psInserir.setString(3, endereco.getLogradouro());
      psInserir.setInt(4, endereco.getNumero());
      psInserir.setString(5, endereco.getBairro());
      psInserir.setString(6, endereco.getCidade());
      psInserir.setString(7, endereco.getEstado());

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          endereco.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir endereço", e);
    } 
  }
  
  public Endereco consultar(int idCliente) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultar = connection.prepareStatement(consultar);
    ) {
      psConsultar.setInt(1, idCliente);

      try(ResultSet rsConsultar = psConsultar.executeQuery()){
        if (rsConsultar.next()) {
          Endereco endereco = new Endereco(
            rsConsultar.getInt("id"),
            rsConsultar.getInt("idCliente"),
            rsConsultar.getString("cep"),
            rsConsultar.getString("logradouro"),
            rsConsultar.getInt("numero"),
            rsConsultar.getString("bairro"),
            rsConsultar.getString("cidade"),
            rsConsultar.getString("estado")
          );

          return endereco;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar endereço", e);
    } 
  }
}