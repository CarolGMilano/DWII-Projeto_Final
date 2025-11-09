package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Categoria;

@Repository
public class CategoriaDao implements DaoI<Categoria> {

    @Override
    public void add(Categoria categoria) throws Exception {
        String sql = "INSERT INTO categoria (descricao) VALUES (?)";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, categoria.getDescricao());
            ps.executeUpdate();

            try (ResultSet rs = ps.getGeneratedKeys()) {
                if (rs.next()) {
                    categoria.setId(rs.getInt(1));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao adicionar categoria: " + e.getMessage());
        }
    }

    @Override
    public List<Categoria> getAll() throws Exception {
        String sql = "SELECT id, descricao FROM categoria";
        List<Categoria> categorias = new ArrayList<>();

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String descricao = rs.getString("descricao");
                categorias.add(new Categoria(id, descricao));
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao listar categorias: " + e.getMessage());
        }

        return categorias;
    }

    @Override
    public Categoria getById(int id) throws Exception {
        String sql = "SELECT id, descricao FROM categoria WHERE id = ?";
        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Categoria(rs.getInt("id"), rs.getString("descricao"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar categoria por ID: " + e.getMessage());
        }
        return null;
    }

    public Categoria getByNome(String descricao) throws Exception {
        String sql = "SELECT id, descricao FROM categoria WHERE LOWER(descricao) = LOWER(?)";
        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, descricao);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Categoria(rs.getInt("id"), rs.getString("descricao"));
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar categoria por nome: " + e.getMessage());
        }
        return null;
    }

    @Override
    public void update(Categoria categoria) throws Exception {
        String sql = "UPDATE categoria SET descricao = ? WHERE id = ?";
        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, categoria.getDescricao());
            ps.setInt(2, categoria.getId());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao atualizar categoria: " + e.getMessage());
        }
    }

    @Override
    public void delete(Categoria categoria) throws Exception {
        String sql = "DELETE FROM categoria WHERE id = ?";
        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, categoria.getId());
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao deletar categoria: " + e.getMessage());
        }
    }
}
