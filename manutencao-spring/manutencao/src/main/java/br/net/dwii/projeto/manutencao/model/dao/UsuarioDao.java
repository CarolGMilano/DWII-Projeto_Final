package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Usuario;

public class UsuarioDao {
  private final String inserir = "INSERT INTO usuario (nome, email, senha, idTipo, ativo) VALUES (?, ?, ?, ?, ?)";
  private final String alterar = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
  private final String consultar = "SELECT id, nome, email, idTipo, ativo FROM usuario WHERE id = ? AND ativo = true";
  private final String listar = "SELECT id, nome, email, senha, idTipo, ativo FROM usuario WHERE ativo = true AND idTipo = ?";
  private final String deletar = "UPDATE usuario SET ativo = false WHERE id = ?";

  public void adicionar(Usuario usuario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setString(1, usuario.getNome());
      psInserir.setString(2, usuario.getEmail());
      psInserir.setString(3, usuario.getSenha());
      psInserir.setInt(4, usuario.getTipo());
      psInserir.setBoolean(5, usuario.getAtivo());

      psInserir.executeUpdate();

      try(ResultSet rsInserir = psInserir.getGeneratedKeys()){
        if(rsInserir.next()){
          int id = rsInserir.getInt(1);

          usuario.setId(id);
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new UnsupportedOperationException("Unimplemented method 'adicionar'");
    } 
  }

  public void alterar(Usuario usuario) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psAlterar = connection.prepareStatement(alterar);
    ) {
      psAlterar.setString(1, usuario.getNome());
      psAlterar.setString(2, usuario.getEmail());
      psAlterar.setString(3, usuario.getSenha());
      psAlterar.setInt(4, usuario.getId());

      psAlterar.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new UnsupportedOperationException("Unimplemented method 'alterar'");
    }
  }

  public Usuario consultar(int idUsuario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultar = connection.prepareStatement(consultar);
    ) {
      psConsultar.setInt(1, idUsuario);

      try(ResultSet rsConsultar = psConsultar.executeQuery()){
        if (rsConsultar.next()) {
          Usuario usuario = new Usuario(
            rsConsultar.getInt("id"),
            rsConsultar.getString("nome"),
            rsConsultar.getString("email"),
            rsConsultar.getInt("idTipo"),
            rsConsultar.getBoolean("ativo")
          );

          return usuario;
        } else {
          return null;
        }
      }
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new UnsupportedOperationException("Unimplemented method 'consultar'");
    } 
  }

  public List<Usuario> listar(int tipo) throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
    ) {
      psListar.setInt(1, tipo);

      try(ResultSet rsListar = psListar.executeQuery()){
        List<Usuario> usuarios = new ArrayList<>();
        
        while (rsListar.next()) {
          Usuario usuario = new Usuario(
            rsListar.getInt("id"),
            rsListar.getString("nome"),
            rsListar.getString("email"),
            rsListar.getInt("idTipo"),
            rsListar.getBoolean("ativo")
          );

          usuarios.add(usuario);
        }
        return usuarios;
      } 
    }
    catch (Exception e) {
      e.printStackTrace();
      throw new UnsupportedOperationException("Unimplemented method 'listar'");
    } 
  }

  public void deletar(int idUsuario) throws Exception {
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psDeletar = connection.prepareStatement(deletar);
    ) {
      psDeletar.setInt(1, idUsuario);

      psDeletar.executeUpdate();
    } 
    catch (Exception e) {
      e.printStackTrace();
      throw new UnsupportedOperationException("Unimplemented method 'deletar'");
    }
  }
}