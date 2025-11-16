package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Solicitacao;

@Repository
public class SolicitacaoDao {
  private final String inserir = "INSERT INTO solicitacao (equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente) VALUES (?, ?, ?, ?, ?, ?)";
  private final String consultar = "SELECT id, equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente FROM solicitacao WHERE id = ?";  
  private final String alterarStatus = "UPDATE solicitacao SET idStatus = ? WHERE id = ?";
  private final String alterarFuncionario = "UPDATE solicitacao SET idFuncionario = ? WHERE id = ?";
  private final String listar = "SELECT id, equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente FROM solicitacao";
  private final String listarPorFuncionario = "SELECT id, equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente FROM solicitacao WHERE idFuncionario = ?";
  private final String listarPorCliente = "SELECT id, equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente FROM solicitacao WHERE idCliente = ?";

  public void inserir(Solicitacao solicitacao) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setString(1, solicitacao.getEquipamento());
      psInserir.setInt(2, solicitacao.getIdCategoria());
      psInserir.setString(3, solicitacao.getDescricao());
      psInserir.setInt(4, solicitacao.getIdStatus());
      //Ao inserir, o id do funcionário sempre será null. Pois nenhum funcionário pegou a responsabilidade ainda.
      psInserir.setNull(5, java.sql.Types.INTEGER);
      psInserir.setInt(6, solicitacao.getIdCliente());

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          solicitacao.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir solicitação", e);
    } 
  }
  
  public Solicitacao consultar(int idSolicitacao) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultar = connection.prepareStatement(consultar);
    ) {
      psConsultar.setInt(1, idSolicitacao);

      try(ResultSet rsConsultar = psConsultar.executeQuery()){
        if (rsConsultar.next()) {
          Solicitacao solicitacao = new Solicitacao(
            rsConsultar.getInt("id"),
            rsConsultar.getString("equipamento"),
            rsConsultar.getInt("idCategoria"),
            rsConsultar.getString("descricao"),
            rsConsultar.getInt("idStatus"),
            rsConsultar.getInt("idFuncionario"),
            rsConsultar.getInt("idCliente")
          );

          return solicitacao;
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

  public List<Solicitacao> listar() throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
      ResultSet rsListar = psListar.executeQuery();
    ) {
      List<Solicitacao> solicitacoes = new ArrayList<>();

      while (rsListar.next()) {
        Solicitacao solicitacao = new Solicitacao(
          rsListar.getInt("id"),
          rsListar.getString("equipamento"),
          rsListar.getInt("idCategoria"),
          rsListar.getString("descricao"),
          rsListar.getInt("idStatus"),
          rsListar.getInt("idFuncionario"),
          rsListar.getInt("idCliente")
        );

        solicitacoes.add(solicitacao);
      }
      return solicitacoes;
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar solicitações", e);
    } 
  }

  public List<Solicitacao> listarPorCliente(int idCliente) throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listarPorCliente);
    ) {
      psListar.setInt(1, idCliente);

      List<Solicitacao> solicitacoes = new ArrayList<>();

      try (ResultSet rsListar = psListar.executeQuery()) {
        while (rsListar.next()) {
          Solicitacao solicitacao = new Solicitacao(
            rsListar.getInt("id"),
            rsListar.getString("equipamento"),
            rsListar.getInt("idCategoria"),
            rsListar.getString("descricao"),
            rsListar.getInt("idStatus"),
            rsListar.getInt("idFuncionario"),
            rsListar.getInt("idCliente")
          );

          solicitacoes.add(solicitacao);
        }
        return solicitacoes;
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar solicitações por cliente", e);
    } 
  }

  public List<Solicitacao> listarPorFuncionario(int idFuncionario) throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listarPorFuncionario);
    ) {
      psListar.setInt(1, idFuncionario);

      List<Solicitacao> solicitacoes = new ArrayList<>();

      try (ResultSet rsListar = psListar.executeQuery()) {
        while (rsListar.next()) {
          Solicitacao solicitacao = new Solicitacao(
            rsListar.getInt("id"),
            rsListar.getString("equipamento"),
            rsListar.getInt("idCategoria"),
            rsListar.getString("descricao"),
            rsListar.getInt("idStatus"),
            rsListar.getInt("idFuncionario"),
            rsListar.getInt("idCliente")
          );

          solicitacoes.add(solicitacao);
        }
        return solicitacoes;
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar solicitações do funcionário", e);
    } 
  }

  public void alterarStatus(Solicitacao solicitacao) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psAlterarStatus = connection.prepareStatement(alterarStatus);
    ) {
      psAlterarStatus.setInt(1, solicitacao.getIdStatus());
      psAlterarStatus.setInt(2, solicitacao.getId());

      psAlterarStatus.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao alterar status da solicitação", e);
    }
  }

  public void alterarFuncionario(Solicitacao solicitacao) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psAlterarFuncionario = connection.prepareStatement(alterarFuncionario);
    ) {
      psAlterarFuncionario.setInt(1, solicitacao.getIdFuncionario());
      psAlterarFuncionario.setInt(2, solicitacao.getId());

      psAlterarFuncionario.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao alterar o funcionário da solicitação", e);
    }
  }
}
