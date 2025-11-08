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
    public void add(Categoria objeto) throws Exception {
        String sql = "INSERT INTO categoria (nome) VALUES (?)";
        PreparedStatement ps = null;
        Connection conn = null;

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getDescricao());
            ps.executeUpdate();
            ps.close();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'add'");
        }
    }

    @Override
    public List<Categoria> getAll() throws Exception {
        String sql = "INSERT INTO categoria (nome) VALUES (?)";
        PreparedStatement ps = null;
        Connection conn = null;
        ResultSet rs = null;

        try{
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            List<Categoria> categorias = new ArrayList<>();

            while(rs.next()){
                int id = rs.getInt("id");
                String nome = rs.getString("nome");

                Categoria categoria = new Categoria(id, nome);
                categorias.add(categoria);
            }

            rs.close();
            ps.close();

            return categorias;
        }

        catch(Exception e){
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getAll'");
        }
        finally {
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }

    @Override
    public Categoria getById(int id) throws Exception {
        String sql = "SELECT id, nome FROM categoria WHERE id = ?";
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setInt(1, id);
            rs = ps.executeQuery();

            if (rs.next()) {
                int catId = rs.getInt("id");
                String nome = rs.getString("nome");
                return new Categoria(catId, nome);
            }

            rs.close();
            ps.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao buscar categoria por ID: " + e.getMessage());
        }
        return null;
    }

    @Override
    public void update(Categoria objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE categoria SET nome = ? WHERE id = ?";

        try {
            // conn = Conexao.getConexao();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getDescricao());
            ps.setInt(2, objeto.getId());
            ps.executeUpdate();
            ps.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'update'");
        }
    }

    @Override
    public void delete(Categoria objeto) throws Exception {
        String sql = "DELETE FROM categoria WHERE id = ?";

        try (Connection conn = ConnectionDB.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, objeto.getId());
            ps.executeUpdate();
            ps.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Erro ao deletar categoria: " + e.getMessage());
        }
    }
    
}
