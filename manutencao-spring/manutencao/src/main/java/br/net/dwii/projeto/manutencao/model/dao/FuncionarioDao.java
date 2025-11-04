package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Funcionario;

@Repository
public class FuncionarioDao {
  private final String inserir = "INSERT INTO funcionario (idUsuario, dataNascimento) VALUES (?, ?)";
  private final String alterar = "UPDATE funcionario SET dataNascimento = ? WHERE id = ?";
  private final String consultar = "SELECT f.id, f.idUsuario, f.dataNascimento FROM funcionario f JOIN usuario u ON f.idUsuario = u.id WHERE f.id = ? AND u.ativo = true";
  private final String listar = "SELECT f.id, f.idUsuario, f.dataNascimento FROM funcionario f JOIN usuario u ON f.idUsuario = u.id WHERE u.ativo = true";

  public void inserir(Funcionario funcionario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, funcionario.getIdUsuario());
      psInserir.setDate(2, new java.sql.Date(funcionario.getDataNascimento().getTime()));

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          funcionario.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir funcionário", e);
    } 
  }

  public void alterar(Funcionario funcionario) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psAlterar = connection.prepareStatement(alterar);
    ) {
      psAlterar.setDate(1, new java.sql.Date(funcionario.getDataNascimento().getTime()));
      psAlterar.setLong(2, funcionario.getId());

      psAlterar.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao alterar funcionário", e);
    }
  }

  public Funcionario consultar(int idFuncionario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultar = connection.prepareStatement(consultar);
    ) {
      psConsultar.setInt(1, idFuncionario);

      try(ResultSet rsConsultar = psConsultar.executeQuery()){
        if (rsConsultar.next()) {
          Funcionario funcionario = new Funcionario(
            rsConsultar.getInt("id"),
            rsConsultar.getInt("idUsuario"),
            rsConsultar.getDate("dataNascimento")
          );

          return funcionario;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar funcionário", e);
    } 
  }

  public List<Funcionario> listar() throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
      ResultSet rsListar = psListar.executeQuery();
    ) {
      List<Funcionario> funcionarios = new ArrayList<>();

      while (rsListar.next()) {
        Funcionario funcionario = new Funcionario(
          rsListar.getInt("id"),
          rsListar.getInt("idUsuario"),
          rsListar.getDate("dataNascimento")
        );

        funcionarios.add(funcionario);
      }
      return funcionarios;
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar funcionários", e);
    } 
  }
}