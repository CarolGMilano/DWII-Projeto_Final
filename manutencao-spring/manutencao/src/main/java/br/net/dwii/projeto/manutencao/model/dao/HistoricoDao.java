package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Historico;

@Repository
public class HistoricoDao {
  private final String inserir = "INSERT INTO historico (idSolicitacao, dataHora, idStatus, idFuncionario, idFuncionarioDestino, msgRejeicao) VALUES (?, ?, ?, ?, ?, ?)";
  private final String listar = "SELECT id, idSolicitacao, dataHora, idStatus, idFuncionario, idFuncionarioDestino, msgRejeicao FROM historico WHERE idSolicitacao = ?";

  public void inserir(Historico historico) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, historico.getIdSolicitacao());
      psInserir.setTimestamp(2, historico.getDataHora());
      psInserir.setInt(3, historico.getIdStatus());

      if (historico.getIdFuncionario() != null) {
        psInserir.setInt(4, historico.getIdFuncionario());
      } else {
        psInserir.setNull(4, java.sql.Types.INTEGER);
      }

      if (historico.getIdFuncionarioDestino() != null) {
        psInserir.setInt(5, historico.getIdFuncionarioDestino());
      } else {
        psInserir.setNull(5, java.sql.Types.INTEGER);
      }

      if (historico.getMsgRejeicao() != null) {
          psInserir.setString(6, historico.getMsgRejeicao());
      } else {
          psInserir.setNull(6, java.sql.Types.VARCHAR);
      }
      
      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          historico.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir histórico", e);
    } 
  }

  public List<Historico> listar(int idSolicitacao) throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
    ) {
      psListar.setInt(1, idSolicitacao);

      List<Historico> historicos = new ArrayList<>();

      try (ResultSet rsListar = psListar.executeQuery()) {
        while (rsListar.next()) {
          Historico historico = new Historico(
            rsListar.getInt("id"),
            rsListar.getInt("idSolicitacao"),
            rsListar.getTimestamp("dataHora"),
            rsListar.getInt("idStatus"),
            rsListar.getInt("idFuncionario"),
            rsListar.getInt("idFuncionarioDestino"),
            rsListar.getString("msgRejeicao")
          );

          historicos.add(historico);
        }
        return historicos;
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar histórico", e);
    } 
  }
}
