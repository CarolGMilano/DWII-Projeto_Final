package br.net.dwii.projeto.manutencao.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.entity.Cliente;

public class ClienteDao implements DaoI<Cliente> {
    @Override
    public void add(Cliente objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "INSERT INTO cliente (nome, telefone, email) VALUES (?, ?, ?)";
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getNome());
            ps.setString(2, objeto.getTelefone());
            ps.setString(3, objeto.getEmail());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'add'");
        } finally {
            if (ps != null) ps.close();
            if (conn != null) conn.close();
        }
    }

    @Override
    public List<Cliente> getAll() throws Exception {
       Connection conn = null;
       PreparedStatement ps = null;
       String sql = "SELECT id, nome, telefone, email FROM cliente";
       ResultSet rs = null;
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            List<Cliente> clientes = new ArrayList();
            while (rs.next()) {
            Cliente cliente = new Cliente(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    null,
                    null,
                    null,
                    rs.getString("telefone"),
                    null
            );
            clientes.add(cliente);
            }
            return clientes;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getAll'");
        } finally {
            if (rs != null) rs.close();
            if (ps != null) ps.close();
            if (conn != null) conn.close();
        }
    }

    @Override
    public Cliente getById(long id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "SELECT id, nome, telefone, email FROM cliente WHERE id = ?";
        ResultSet rs = null;

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Cliente cliente = new Cliente(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    null,
                    null,
                    null,
                    rs.getString("telefone"),
                    null
                );
                return cliente;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getById'");
        } finally {
            if (rs != null) rs.close();
            if (ps != null) ps.close();
            if (conn != null) conn.close();
        }
    }

    @Override
    public void update(Cliente objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE id = ?";
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getNome());
            ps.setString(2, objeto.getTelefone());
            ps.setString(3, objeto.getEmail());
            ps.setLong(4, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'update'");
        } finally {
            if (ps != null) ps.close();
            if (conn != null) conn.close();
        }
    }

    @Override
    public void delete(Cliente objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "DELETE FROM cliente WHERE id = ?";
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'delete'");
        } finally {
            if (ps != null) ps.close();
            if (conn != null) conn.close();
        }
    }
    
}
