package br.net.dwii.projeto.manutencao.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.entity.Categoria;
import br.net.dwii.projeto.manutencao.entity.Cliente;
import br.net.dwii.projeto.manutencao.entity.Funcionario;
import br.net.dwii.projeto.manutencao.entity.Historico;
import br.net.dwii.projeto.manutencao.entity.Orcamento;
import br.net.dwii.projeto.manutencao.entity.Solicitacao;

public class SolicitacaoDao implements DaoI<Solicitacao> {

    private ClienteDao clienteDao = new ClienteDao();
    private CategoriaDao categoriaDao = new CategoriaDao();
    private HistoricoDao historicoDao = new HistoricoDao();
    private OrcamentoDao orcamentoDao = new OrcamentoDao();
    private FuncionarioDao funcionarioDao = new FuncionarioDao();

    @Override
    public void add(Solicitacao objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "INSERT INTO solicitacao (equipamento, id_categoria, descricao, status, id_cliente, id_funcionario, data_abertura, id_orcamento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getEquipamento());
            ps.setLong(2, objeto.getCategoria().getId());
            ps.setString(3, objeto.getDescricao());
            ps.setInt(4, objeto.getStatus().intValue());
            ps.setLong(5, objeto.getCliente().getId());
            ps.setLong(6, objeto.getFuncionario().getId());
            ps.setDate(7, new java.sql.Date(objeto.getDataAbertura().getTime()));
            ps.setLong(8, objeto.getOrcamento().getId());
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
    public List<Solicitacao> getAll() throws Exception {
       Connection conn = null;
       PreparedStatement ps = null;
       ResultSet rs = null;
       String sql = "SELECT * FROM solicitacao";

       try{
           // conn = ConnectionFactory.getConnection();
           ps = conn.prepareStatement(sql);
           rs = ps.executeQuery();

           List<Solicitacao> solicitacoes = new ArrayList();

           while (rs.next()) {
               Categoria categoria = categoriaDao.getById(rs.getLong("id_categoria"));
               Cliente cliente = clienteDao.getById(rs.getLong("id_cliente"));
               Funcionario funcionario = funcionarioDao.getById(rs.getLong("id_funcionario")); 
               Orcamento orcamento = orcamentoDao.getById(rs.getLong("id_orcamento"));

               List<Historico> historicoList = historicoDao.getAll(); 

               Solicitacao solicitacao = new Solicitacao(
                   rs.getLong("id"),
                   rs.getString("equipamento"),
                   categoria,
                   rs.getString("descricao"),
                   rs.getInt("status"), 
                   cliente,
                   funcionario,
                   historicoList, 
                   rs.getDate("data_abertura"),
                   orcamento
               );

               solicitacoes.add(solicitacao);
           }
           return solicitacoes;
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
    public Solicitacao getById(long id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT * FROM solicitacao WHERE id = ?";

        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Categoria categoria = categoriaDao.getById(rs.getLong("id_categoria"));
                Cliente cliente = clienteDao.getById(rs.getLong("id_cliente"));
                Funcionario funcionario = funcionarioDao.getById(rs.getLong("id_funcionario")); 
                Orcamento orcamento = orcamentoDao.getById(rs.getLong("id_orcamento"));
                List<Historico> historicoList = historicoDao.getAll(); 

                Solicitacao solicitacao = new Solicitacao(
                    rs.getLong("id"),
                    rs.getString("equipamento"),
                    categoria,
                    rs.getString("descricao"),
                    rs.getInt("status"), 
                    cliente,
                    funcionario,
                    historicoList, 
                    rs.getDate("data_abertura"),
                    orcamento
                );

                return solicitacao;
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
    public void update(Solicitacao objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "UPDATE solicitacao SET equipamento = ?, id_categoria = ?, descricao = ?, status = ?, id_cliente = ?, id_funcionario = ?, data_abertura = ?, id_orcamento = ? WHERE id = ?";

        try {
            // conn = ConnectionFactory.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getEquipamento());
            ps.setLong(2, objeto.getCategoria().getId());
            ps.setString(3, objeto.getDescricao());
            ps.setInt(4, objeto.getStatus().intValue());
            ps.setLong(5, objeto.getCliente().getId());
            ps.setLong(6, objeto.getFuncionario().getId());
            ps.setDate(7, new java.sql.Date(objeto.getDataAbertura().getTime()));
            ps.setLong(8, objeto.getOrcamento().getId());
            ps.setLong(9, objeto.getId());
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
    public void delete(Solicitacao objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "DELETE FROM solicitacao WHERE id = ?";

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
