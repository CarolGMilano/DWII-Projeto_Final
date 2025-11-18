package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Orcamento;

@Repository
public class OrcamentoDao {
  private final String inserir = "INSERT INTO orcamento (idSolicitacao, valorTotal, aprovada, msgRejeicao) VALUES (?, ?, ?, ?)";
  private final String consultarPorSolicitacao = "SELECT id, idSolicitacao, valorTotal, aprovada, msgRejeicao FROM orcamento WHERE idSolicitacao = ?";
  private final String alterarAprovacao = "UPDATE orcamento SET aprovada = ?, msgRejeicao = ? WHERE id = ?";

  public void inserir(Orcamento orcamento) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
          System.out.println("entrei");
      psInserir.setInt(1, orcamento.getIdSolicitacao());
      psInserir.setDouble(2, orcamento.getValorTotal());

      if (orcamento.getAprovado() != null) {
        psInserir.setBoolean(3, orcamento.getAprovado());
      } else {
        psInserir.setNull(3, java.sql.Types.BOOLEAN);
      }

      if (orcamento.getMsgRejeicao() != null) {
        psInserir.setString(4, orcamento.getMsgRejeicao());
      } else {
        psInserir.setNull(4, java.sql.Types.VARCHAR);
      }

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          orcamento.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir orçamento", e);
    } 
  }
  
  public Orcamento consultar(int idSolicitacao) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultarPorSolicitacao = connection.prepareStatement(consultarPorSolicitacao);
    ) {
      psConsultarPorSolicitacao.setInt(1, idSolicitacao);

      try(ResultSet rsConsultarPorSolicitacao = psConsultarPorSolicitacao.executeQuery()){
        if (rsConsultarPorSolicitacao.next()) {
          Boolean aprovada = rsConsultarPorSolicitacao.getBoolean("aprovada");

          if (rsConsultarPorSolicitacao.wasNull()) {
            aprovada = null;
          }

          Orcamento orcamento = new Orcamento(
            rsConsultarPorSolicitacao.getInt("id"), 
            rsConsultarPorSolicitacao.getInt("idSolicitacao"), 
            rsConsultarPorSolicitacao.getDouble("valorTotal"), 
            aprovada, 
            rsConsultarPorSolicitacao.getString("msgRejeicao")
          );

          return orcamento;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao consultar orçamento", e);
    } 
  }

  public void alterarAprovacao(Orcamento orcamento) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psAlterarAprovacao = connection.prepareStatement(alterarAprovacao);
    ) {
      psAlterarAprovacao.setBoolean(1, orcamento.getAprovado());
      psAlterarAprovacao.setString(2, orcamento.getMsgRejeicao());
      psAlterarAprovacao.setInt(3, orcamento.getId());

      psAlterarAprovacao.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao alterar aprovação do orçamento", e);
    }
  }
}