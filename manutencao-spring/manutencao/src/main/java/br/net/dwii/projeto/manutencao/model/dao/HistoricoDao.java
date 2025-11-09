// package br.net.dwii.projeto.manutencao.model.dao;

// import java.sql.Connection;
// import java.sql.PreparedStatement;
// import java.sql.ResultSet;
// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.stereotype.Repository;

// import br.net.dwii.projeto.manutencao.model.Funcionario;
// import br.net.dwii.projeto.manutencao.model.Historico;

// @Repository
// public class HistoricoDao implements DaoI<Historico> {
//     private FuncionarioDao funcionarioDao = new FuncionarioDao();

//     @Override
//     public void add(Historico objeto) throws Exception {
//         Connection conn = null;
//         PreparedStatement ps = null;
//         String sql = "INSERT INTO historico (id_solicitacao,dataHora, status, idFuncionario ) VALUES (?, ?, ?)";   
        
//         try {
//             // conn = ConnectionFactory.getConnection();

//             ps = conn.prepareStatement(sql);
//             ps.setLong(1, objeto.getIdSolicitacao());   
//             ps.setDate(2, objeto.getDataHora());
//             ps.setInt(3, objeto.getStatus());
//             ps.setLong(4, objeto.getFuncionario().getId());
//             ps.executeUpdate();
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new UnsupportedOperationException("Unimplemented method 'add'");
//         } 
//         finally {
//             if (ps != null) {
//                 ps.close();
//             }
//             if (conn != null) {
//                 conn.close();
//             }
//         }
//     }

//     @Override
//     public List<Historico> getAll() throws Exception {
//         Connection conn = null;
//         PreparedStatement ps = null;
//         ResultSet rs = null;
//         String sql = "SELECT * FROM historico";

//         try{
//             // conn = ConnectionFactory.getConnection();
//             ps = conn.prepareStatement(sql);
//             rs = ps.executeQuery();

//             List<Historico> historicoList = new ArrayList();

//             while (rs.next()) {
//                Funcionario funcionario = funcionarioDao.consultar(rs.getInt("id_funcionario")); 
//                 Funcionario funcionarioDestino = funcionarioDao.consultar(rs.getInt("id_funcionario_destino")); 

//                 Historico historico = new Historico(
//                     rs.getInt("id"),
//                     rs.getInt("id_solicitacao"),
//                     rs.getDate("dataHora"),
//                     rs.getInt("status"),
//                     funcionario,
//                     funcionarioDestino
//                 );
//                 historicoList.add(historico);
//             }
//             return historicoList;
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new UnsupportedOperationException("Unimplemented method 'getAll'");
//         } finally {
//             if (rs != null) {
//                 rs.close();
//             }
//             if (ps != null) {
//                 ps.close();
//             }
//             if (conn != null) {
//                 conn.close();
//             }
//         }
//     }

//     @Override
//     public Historico getById(int id) throws Exception {
//         Connection conn = null;
//         PreparedStatement ps = null;
//         ResultSet rs = null;
//         String sql = "SELECT * FROM historico WHERE id = ?";

//         try{
//             // conn = ConnectionFactory.getConnection();
//             ps = conn.prepareStatement(sql);
//             ps.setInt(1, id);
//             rs = ps.executeQuery();

//             if (rs.next()) {
//                Funcionario funcionario = funcionarioDao.consultar(rs.getInt("id_funcionario")); 
//                Funcionario funcionarioDestino = funcionarioDao.consultar(rs.getInt("id_funcionario_destino")); 

//                 Historico historico = new Historico(
//                     rs.getInt("id"),
//                     rs.getInt("id_solicitacao"),
//                     rs.getDate("dataHora"),
//                     rs.getInt("status"),
//                     funcionario,
//                     funcionarioDestino
//                 );
//                 return historico;
//             } else {
//                 return null;
//             }
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new UnsupportedOperationException("Unimplemented method 'getById'");
//         } finally {
//             if (rs != null) {
//                 rs.close();
//             }
//             if (ps != null) {
//                 ps.close();
//             }
//             if (conn != null) {
//                 conn.close();
//             }
//         }
//     }

//     @Override
//     public void update(Historico objeto) throws Exception {
//         Connection conn = null;
//         PreparedStatement ps = null;
//         String sql = "UPDATE historico SET id_solicitacao = ?, dataHora = ?, status = ?, id_funcionario = ?, id_funcionario_destino = ? WHERE id = ?";

//         try {
//             // conn = ConnectionFactory.getConnection();

//             ps = conn.prepareStatement(sql);
//             ps.setLong(1, objeto.getIdSolicitacao());   
//             ps.setDate(2, objeto.getDataHora());
//             ps.setInt(3, objeto.getStatus());
//             ps.setLong(4, objeto.getFuncionario().getId());
//             ps.setLong(5, objeto.getFuncionarioDestino().getId());
//             ps.setLong(6, objeto.getId());
//             ps.executeUpdate();
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new UnsupportedOperationException("Unimplemented method 'update'");
//         } 
//         finally {
//             if (ps != null) {
//                 ps.close();
//             }
//             if (conn != null) {
//                 conn.close();
//             }
//         }
//     }

//     @Override
//     public void delete(Historico objeto) throws Exception {
//         Connection conn = null;
//         PreparedStatement ps = null;
//         String sql = "DELETE FROM historico WHERE id = ?";
        
//         try {
//             // conn = ConnectionFactory.getConnection();

//             ps = conn.prepareStatement(sql);
//             ps.setLong(1, objeto.getId());   
//             ps.executeUpdate();
//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new UnsupportedOperationException("Unimplemented method 'delete'");
//         } 
//         finally {
//             if (ps != null) {
//                 ps.close();
//             }
//             if (conn != null) {
//                 conn.close();
//             }
//         }
//     }
    
// }
