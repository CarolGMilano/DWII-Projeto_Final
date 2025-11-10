package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Orcamento;

@Repository
public class OrcamentoDao implements DaoI<Orcamento> {

    @Override
    public void add(Orcamento orcamento) throws Exception {
        String sql = "INSERT INTO orcamento (idSolicitacao, valorTotal, aprovada, msgRejeicao) VALUES (?, ?, ?, ?)";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

            ps.setInt(1, orcamento.getIdSolicitacao());
            ps.setDouble(2, orcamento.getValorTotal());

            if (orcamento.getAprovado() != null)
                ps.setBoolean(3, orcamento.getAprovado());
            else
                ps.setNull(3, java.sql.Types.BOOLEAN);

            ps.setString(4, orcamento.getMsgRejeicao());
            ps.executeUpdate();

            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    orcamento.setId(rs.getInt(1));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao adicionar orçamento: " + e.getMessage());
        }
    }

    @Override
    public List<Orcamento> getAll() throws Exception {
        String sql = "SELECT * FROM orcamento";
        List<Orcamento> orcamentos = new ArrayList<>();

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Orcamento o = new Orcamento(
                    rs.getInt("id"),
                    rs.getInt("idSolicitacao"),
                    rs.getDouble("valorTotal"),
                    rs.getObject("aprovada") != null ? rs.getBoolean("aprovada") : null,
                    rs.getString("msgRejeicao")
                );
                orcamentos.add(o);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar orçamentos: " + e.getMessage());
        }

        return orcamentos;
    }

    @Override
    public Orcamento getById(int id) throws Exception {
        String sql = "SELECT * FROM orcamento WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Orcamento(
                        rs.getInt("id"),
                        rs.getInt("idSolicitacao"),
                        rs.getDouble("valorTotal"),
                        rs.getObject("aprovada") != null ? rs.getBoolean("aprovada") : null,
                        rs.getString("msgRejeicao")
                    );
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar orçamento por ID: " + e.getMessage());
        }

        return null;
    }

    @Override
    public void update(Orcamento orcamento) throws Exception {
        String sql = "UPDATE orcamento SET idSolicitacao = ?, valorTotal = ?, aprovada = ?, msgRejeicao = ? WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, orcamento.getIdSolicitacao());
            ps.setDouble(2, orcamento.getValorTotal());

            if (orcamento.getAprovado() != null)
                ps.setBoolean(3, orcamento.getAprovado());
            else
                ps.setNull(3, java.sql.Types.BOOLEAN);

            ps.setString(4, orcamento.getMsgRejeicao());
            ps.setInt(5, orcamento.getId());

            System.out.println("DEBUG -> Aprovado recebido: " + orcamento.getAprovado());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao atualizar orçamento: " + e.getMessage());
        }
    }

    @Override
    public void delete(Orcamento orcamento) throws Exception {
        String sql = "DELETE FROM orcamento WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, orcamento.getId());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao excluir orçamento: " + e.getMessage());
        }
    }
}
