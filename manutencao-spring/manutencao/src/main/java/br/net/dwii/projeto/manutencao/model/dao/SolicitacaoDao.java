package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Solicitacao;

@Repository
public class SolicitacaoDao implements DaoI<Solicitacao> {

    private ClienteDao clienteDao = new ClienteDao();
    private CategoriaDao categoriaDao = new CategoriaDao();
    // private HistoricoDao historicoDao = new HistoricoDao();
    // private OrcamentoDao orcamentoDao = new OrcamentoDao();
    private FuncionarioDao funcionarioDao = new FuncionarioDao();

    @Override
    public void add(Solicitacao objeto) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        String sql = "INSERT INTO solicitacao (equipamento, idCategoria, descricao, idStatus, idFuncionario, idCliente) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, objeto.getEquipamento());
            ps.setLong(2, objeto.getIdCategoria());
            ps.setString(3, objeto.getDescricao());
            ps.setInt(4, objeto.getIdStatus());
            ps.setLong(5, objeto.getIdFuncionario());
            ps.setLong(6, objeto.getIdCliente());

            ps.executeUpdate();

            try (ResultSet rsInserir = ps.getGeneratedKeys()) {
                if (rsInserir.next()) {
                    int id = rsInserir.getInt(1);

                    objeto.setId(id);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
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

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            List<Solicitacao> solicitacoes = new ArrayList();

            while (rs.next()) {
                Solicitacao solicitacao = new Solicitacao(
                        rs.getInt("id"),
                        rs.getString("equipamento"),
                        rs.getInt("idCategoria"),
                        rs.getString("descricao"),
                        rs.getInt("idStatus"),
                        rs.getInt("idFuncionario"),
                        rs.getInt("idCliente")
                );

                solicitacoes.add(solicitacao);
            }
            return solicitacoes;
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getAll'");
        } finally {
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
    public Solicitacao getById(int id) throws Exception {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        String sql = "SELECT * FROM solicitacao WHERE id = ?";

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Solicitacao solicitacao = new Solicitacao(
                        rs.getInt("id"),
                        rs.getString("equipamento"),
                        rs.getInt("idCategoria"),
                        rs.getString("descricao"),
                        rs.getInt("idStatus"),
                        rs.getInt("idFuncionario"),
                        rs.getInt("idCliente")
                );

                return solicitacao;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'getById'");
        } finally {
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
        String sql = "UPDATE solicitacao SET equipamento = ?, idCategoria = ?, descricao = ?, idStatus = ?,  idFuncionario = ?, idCliente = ? WHERE id = ?";

        try {
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, objeto.getEquipamento());
            ps.setLong(2, objeto.getIdCategoria());
            ps.setString(3, objeto.getDescricao());
            ps.setInt(4, objeto.getIdStatus());
            ps.setLong(5, objeto.getIdFuncionario());
            ps.setLong(6, objeto.getIdCliente());
            ps.setInt(7, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'update'");
        } finally {
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
            conn = ConnectionDB.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setLong(1, objeto.getId());
            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new UnsupportedOperationException("Unimplemented method 'delete'");
        } finally {
            if (ps != null) {
                ps.close();
            }
            if (conn != null) {
                conn.close();
            }
        }
    }

}
