package br.net.dwii.projeto.manutencao.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.entity.Endereco;

public class EnderecoDao implements DaoI<Endereco> {

    @Override
    public void add(Endereco objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "INSERT INTO endereco (cep, logradouro, numero, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?)";

        try {
            // conn = Conexao.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getCep());
            ps.setString(2, objeto.getLogradouro());
            ps.setString(3, objeto.getNumero());
            ps.setString(4, objeto.getBairro());
            ps.setString(5, objeto.getCidade());
            ps.setString(6, objeto.getEstado());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'add'");
        } finally {
            if (ps != null){
                ps.close();
            } 
            if (conn != null) {
                conn.close(); 
            }
        }
    }

    @Override
    public List<Endereco> getAll() throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "SELECT id, cep, logradouro, numero, bairro, cidade, estado FROM endereco";
        ResultSet rs = null;

        try {
            // conn = Conexao.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            List<Endereco> enderecos = new ArrayList();

            while (rs.next()) {
                Endereco endereco = new Endereco(
                    rs.getLong("id"),
                    rs.getString("cep"),
                    rs.getString("logradouro"),
                    rs.getString("numero"),
                    rs.getString("bairro"),
                    rs.getString("cidade"),
                    rs.getString("estado")
                );
                enderecos.add(endereco);
            }
            return enderecos;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getAll'");
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null){
                ps.close();
            } 
            if (conn != null) {
                conn.close(); 
            }
        }
    }

    @Override
    public Endereco getById(long id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "SELECT id, cep, logradouro, numero, bairro, cidade, estado FROM endereco WHERE id = ?";

        try {
            // conn = Conexao.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                Endereco endereco = new Endereco(
                    rs.getLong("id"),
                    rs.getString("cep"),
                    rs.getString("logradouro"),
                    rs.getString("numero"),
                    rs.getString("bairro"),
                    rs.getString("cidade"),
                    rs.getString("estado")
                );
                return endereco;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getById'");
        }
        finally {
            if (ps != null){
                ps.close();
            } 
            if (conn != null) {
                conn.close(); 
            }
        }
        return null;
    }

    @Override
    public void update(Endereco objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE endereco SET cep = ?, logradouro = ?, numero = ?, bairro = ?, cidade = ?, estado = ? WHERE id = ?";
        try {
            // conn = Conexao.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getCep());
            ps.setString(2, objeto.getLogradouro());
            ps.setString(3, objeto.getNumero());
            ps.setString(4, objeto.getBairro());
            ps.setString(5, objeto.getCidade());
            ps.setString(6, objeto.getEstado());
            ps.setLong(7, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'update'");
        }
        finally {
            if (ps != null){
                ps.close();
            } 
            if (conn != null) {
                conn.close(); 
            }
        }
    }

    @Override
    public void delete(Endereco objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "DELETE FROM endereco WHERE id = ?";
        try {
            // conn = Conexao.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'delete'");
        }
        finally {
            if (ps != null){
                ps.close();
            } 
            if (conn != null) {
                conn.close(); 
            }
        }
    }    
}
