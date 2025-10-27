package br.net.dwii.projeto.manutencao.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.entity.Funcionario;

public class FuncionarioDao implements DaoI<Funcionario> {

    @Override
    public void add(Funcionario objeto) throws Exception {
        PreparedStatement ps = null;
        Connection conn = null;
        String sql = "INSERT INTO funcionario (nome, email, senha, tipo, codigo, data_nascimento) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getNome());
            ps.setString(2, objeto.getEmail());
            ps.setString(3, objeto.getSenha());
            ps.setInt(4, objeto.getTipo().intValue());
            ps.setInt(5, objeto.getCodigo().intValue());
            ps.setDate(6, new java.sql.Date(objeto.getDataNascimento().getTime()));
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
    public List<Funcionario> getAll() throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT id, nome, email, senha, tipo, codigo, data";
        
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            List<Funcionario> funcionarios = new ArrayList();
            while (rs.next()) {
                Funcionario funcionario = new Funcionario(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("senha"),
                    rs.getInt("tipo"),
                    rs.getInt("codigo"),
                    rs.getDate("data_nascimento")
                );
                funcionarios.add(funcionario);
            }
            return funcionarios;
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
    public Funcionario getById(long id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT id, nome, email, senha, tipo, codigo, data_nascimento FROM funcionario WHERE id = ?";

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Funcionario funcionario = new Funcionario(
                    rs.getLong("id"),
                    rs.getString("nome"),
                    rs.getString("email"),
                    rs.getString("senha"),
                    rs.getInt("tipo"),
                    rs.getInt("codigo"),
                    rs.getDate("data_nascimento")
                );
                return funcionario;
            } else {
                return null;
            }
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
    public void update(Funcionario objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE funcionario SET nome = ?, email = ?, senha = ?, tipo = ?, codigo = ?, data_nascimento = ? WHERE id = ?";

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getNome());
            ps.setString(2, objeto.getEmail());
            ps.setString(3, objeto.getSenha());
            ps.setInt(4, objeto.getTipo().intValue());
            ps.setInt(5, objeto.getCodigo().intValue());
            ps.setDate(6, new java.sql.Date(objeto.getDataNascimento().getTime()));
            ps.setLong(7, objeto.getId());
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
    public void delete(Funcionario objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "DELETE FROM funcionario WHERE id = ?";

        try {
            conn = ConnectionDB.getConnection();
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
