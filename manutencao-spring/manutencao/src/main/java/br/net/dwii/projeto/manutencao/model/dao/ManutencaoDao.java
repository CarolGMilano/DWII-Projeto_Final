package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Manutencao;

@Repository
public class ManutencaoDao {
  private final String inserir = "INSERT INTO manutencao (idSolicitacao, descricao, orientacao) VALUES (?, ?, ?)";

  public void inserir(Manutencao manutencao) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, manutencao.getIdSolicitacao());
      psInserir.setString(2, manutencao.getDescricao());
      psInserir.setString(3, manutencao.getOrientacao());

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          manutencao.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir manutenção", e);
    } 
  }
}
