package br.net.dwii.projeto.manutencao.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.entity.Servico;

public class ServicoDao implements DaoI<Servico> {

    @Override
    public void add(Servico objeto) throws Exception {
       Connection conn = null;
       PreparedStatement ps = null;
        String sql = "INSERT INTO servico (descricao, valor, id_orcamento) VALUES (?, ?, ?)";

        try {
        //    conn = ps.getConnection(sql);
           ps = conn.prepareStatement(sql);
           ps.setString(1, objeto.getDescricao());
           ps.setDouble(2, objeto.getValor());
           ps.setLong(3, objeto.getIdOrcamento());
           ps.executeUpdate();
        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'add'");
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
    public List<Servico> getAll() throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT * FROM servico";

        try{
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            List<Servico> servicos = new ArrayList();
            while (rs.next()) {
                Servico servico = new Servico(
                    rs.getLong("id"),
                    rs.getString("descricao"),
                    rs.getDouble("valor"),
                    rs.getLong("id_orcamento")
                );
                servicos.add(servico);
            }
            return servicos;
        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getAll'");
        } 
        finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }

    @Override
    public Servico getById(long id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT *  FROM servico WHERE id = ?";

        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Servico servico = new Servico(
                    rs.getLong("id"),
                    rs.getString("descricao"),
                    rs.getDouble("valor"),
                    rs.getLong("id_orcamento")
                );
                return servico;
            }
            return null;
        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getById'");
        } 
        finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }

    @Override
    public void update(Servico objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE servico SET descricao = ?, valor = ?, id_orcamento = ? WHERE id = ?";

        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getDescricao());
            ps.setDouble(2, objeto.getValor());
            ps.setLong(3, objeto.getIdOrcamento());
            ps.setLong(4, objeto.getId());
            ps.executeUpdate();
        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'update'");
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
    public void delete(Servico objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "DELETE FROM servico WHERE id = ?";

        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, objeto.getId());
            ps.executeUpdate();
        } 
        catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'delete'");
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
    
}
