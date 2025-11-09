package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Servico;

@Repository
public class ServicoDao {

    public void add(Servico servico) throws Exception {
        String sql = "INSERT INTO servico (idOrcamento, descricao, preco) VALUES (?, ?, ?)";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, servico.getIdOrcamento());
            ps.setString(2, servico.getDescricao());
            ps.setDouble(3, servico.getPreco());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao inserir serviço: " + e.getMessage());
        }
    }

    public List<Servico> getByOrcamentoId(int idOrcamento) throws Exception {
        String sql = "SELECT * FROM servico WHERE idOrcamento = ?";
        List<Servico> servicos = new ArrayList<>();

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idOrcamento);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                Servico s = new Servico(
                    rs.getInt("id"),
                    rs.getInt("idOrcamento"),
                    rs.getString("descricao"),
                    rs.getDouble("preco")
                );
                servicos.add(s);
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar serviços: " + e.getMessage());
        }

        return servicos;
    }

    public Servico getById(int id) throws Exception {
        String sql = "SELECT * FROM servico WHERE id = ?";
        Servico servico = null;

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                servico = new Servico(
                    rs.getInt("id"),
                    rs.getInt("idOrcamento"),
                    rs.getString("descricao"),
                    rs.getDouble("preco")
                );
            }

            rs.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar serviço por ID: " + e.getMessage());
        }

        return servico;
    }

    public void update(Servico servico) throws Exception {
        String sql = "UPDATE servico SET descricao = ?, preco = ? WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, servico.getDescricao());
            ps.setDouble(2, servico.getPreco());
            ps.setInt(3, servico.getId());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao atualizar serviço: " + e.getMessage());
        }
    }

    public void delete(int id) throws Exception {
        String sql = "DELETE FROM servico WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao deletar serviço: " + e.getMessage());
        }
    }

    public void deleteByOrcamentoId(int idOrcamento) throws Exception {
        String sql = "DELETE FROM servico WHERE idOrcamento = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, idOrcamento);
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao deletar serviços do orçamento: " + e.getMessage());
        }
    }
}
