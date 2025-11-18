package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Servico;

@Repository
public class ServicoDao {
  private final String inserir = "INSERT INTO servico (idOrcamento, descricao, preco) VALUES (?, ?, ?)";
  private final String listar = "SELECT id, idOrcamento, descricao, preco FROM servico WHERE idOrcamento = ?";

  public void inserir(Servico servico) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setInt(1, servico.getIdOrcamento());
      psInserir.setString(2, servico.getDescricao());
      psInserir.setDouble(3, servico.getPreco());
      
      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          servico.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao inserir serviço", e);
    } 
  }

  public List<Servico> listar(int idOrcamento) throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
    ) {
      psListar.setInt(1, idOrcamento);

      List<Servico> servicos = new ArrayList<>();

      try (ResultSet rsListar = psListar.executeQuery()) {
        while (rsListar.next()) {
          Servico servico = new Servico(
            rsListar.getInt("id"),
            rsListar.getInt("idOrcamento"),
            rsListar.getString("descricao"),
            rsListar.getDouble("preco")
          );

          servicos.add(servico);
        }
        return servicos;
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new Exception("Erro ao listar serviços", e);
    } 
  }
}
