package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Cliente;

@Repository
public class ClienteDao {
  private final String inserir = "INSERT INTO cliente (idUsuario, cpf, telefone) VALUES (?, ?, ?)";
  private final String consultar = "SELECT c.id, c.idUsuario, c.cpf, c.telefone FROM cliente c JOIN usuario u ON c.idUsuario = u.id WHERE c.id = ? AND u.ativo = true";
  private final String consultarPorUsuario = "SELECT c.id, c.idUsuario, c.cpf, c.telefone FROM cliente c JOIN usuario u ON c.idUsuario = u.id WHERE c.idUsuario = ? AND u.ativo = true";
  private final String consultarPorCPF = "SELECT c.id, c.idUsuario, c.cpf, c.telefone FROM cliente c JOIN usuario u ON c.idUsuario = u.id WHERE c.cpf = ? AND u.ativo = true";
  private final String listar = "SELECT c.id, c.idUsuario, c.cpf, c.telefone FROM cliente c JOIN usuario u ON c.idUsuario = u.id WHERE u.ativo = true";
  
  /* 
   * Querys para uso futuro. Na versão atual, não há nenhum requisito que peça essas consultas.
   * 
   * private final String alterar = "UPDATE cliente SET cpf = ?, telefone = ? WHERE id = ?";
   * 
   */

  public void inserir(Cliente cliente) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, cliente.getIdUsuario());
      psInserir.setString(2, cliente.getCpf());
      psInserir.setString(3, cliente.getTelefone());

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          cliente.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir cliente", e);
    } 
  }
  
  public Cliente consultar(int idCliente) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultar = connection.prepareStatement(consultar);
    ) {
      psConsultar.setInt(1, idCliente);

      try(ResultSet rsConsultar = psConsultar.executeQuery()){
        if (rsConsultar.next()) {
          Cliente cliente = new Cliente(
            rsConsultar.getInt("id"),
            rsConsultar.getInt("idUsuario"),
            rsConsultar.getString("cpf"),
            rsConsultar.getString("telefone")
          );

          return cliente;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar cliente", e);
    } 
  }

  public Cliente consultarPorCPF(String cpfCliente) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultarPorCPF = connection.prepareStatement(consultarPorCPF);
    ) {
      psConsultarPorCPF.setString(1, cpfCliente);

      try(ResultSet rsConsultar = psConsultarPorCPF.executeQuery()){
        if (rsConsultar.next()) {
          Cliente cliente = new Cliente(
            rsConsultar.getInt("id"),
            rsConsultar.getInt("idUsuario"),
            rsConsultar.getString("cpf"),
            rsConsultar.getString("telefone")
          );

          return cliente;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar cliente pelo CPF", e);
    } 
  }

  public Cliente consultarPorUsuario(int idUsuario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultarPorUsuario = connection.prepareStatement(consultarPorUsuario);
    ) {
      psConsultarPorUsuario.setInt(1, idUsuario);

      try(ResultSet rsConsultar = psConsultarPorUsuario.executeQuery()){
        if (rsConsultar.next()) {
          Cliente cliente = new Cliente(
            rsConsultar.getInt("id"),
            rsConsultar.getInt("idUsuario"),
            rsConsultar.getString("cpf"),
            rsConsultar.getString("telefone")
          );

          return cliente;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar cliente pelo id do usuário", e);
    } 
  }

  public List<Cliente> listar() throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
      ResultSet rsListar = psListar.executeQuery();
    ) {
      List<Cliente> clientes = new ArrayList<>();

      while (rsListar.next()) {
        Cliente cliente = new Cliente(
          rsListar.getInt("id"),
          rsListar.getInt("idUsuario"),
          rsListar.getString("cpf"),
          rsListar.getString("telefone")
        );

        clientes.add(cliente);
      }
      return clientes;
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar clientes", e);
    } 
  }
}