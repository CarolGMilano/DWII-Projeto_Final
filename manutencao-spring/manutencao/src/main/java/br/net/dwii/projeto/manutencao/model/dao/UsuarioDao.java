package br.net.dwii.projeto.manutencao.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import br.net.dwii.projeto.manutencao.connection.ConnectionDB;
import br.net.dwii.projeto.manutencao.model.Usuario;

@Repository
public class UsuarioDao {
  private final String inserir = "INSERT INTO usuario (nome, email, senha, salt, idTipo, ativo) VALUES (?, ?, ?, ?, ?, ?)";
  private final String alterar = "UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?";
  private final String consultar = "SELECT id, nome, email, idTipo, ativo FROM usuario WHERE id = ? AND ativo = true";
  private final String consultarPorEmail = "SELECT * FROM usuario WHERE email = ? AND ativo = true";
  private final String listar = "SELECT id, nome, email, senha, idTipo, ativo FROM usuario WHERE ativo = true AND idTipo = ?";
  private final String deletar = "UPDATE usuario SET ativo = false WHERE id = ?";

  public void inserir(Usuario usuario) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psInserir = connection.prepareStatement(inserir, Statement.RETURN_GENERATED_KEYS);
    ) {
      psInserir.setString(1, usuario.getNome());
      psInserir.setString(2, usuario.getEmail());
      psInserir.setString(3, usuario.getSenha());
      psInserir.setString(4, usuario.getSalt());
      psInserir.setInt(5, usuario.getTipo());
      psInserir.setBoolean(6, usuario.getAtivo());

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
      throw new Exception("Erro ao inserir usuário", e);
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
      throw new Exception("Erro ao alterar usuário", e);
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
      throw new Exception("Erro ao consultar usuário", e);
    } 
  }

  public Usuario consultarPorEmail(String usuarioEmail) throws Exception {
    try (
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psConsultarPorEmail = connection.prepareStatement(consultarPorEmail);
    ) {
      psConsultarPorEmail.setString(1, usuarioEmail);

      try(ResultSet rsConsultar = psConsultarPorEmail.executeQuery()){
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
      throw new Exception("Erro ao consultar usuário por e-mail", e);
    } 
  }

  public List<Usuario> listar() throws Exception {    
    try(
      Connection connection = ConnectionDB.getConnection();
      PreparedStatement psListar = connection.prepareStatement(listar);
    ) {
      //psListar.setInt(1, tipo);

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
      throw new Exception("Erro ao listar usuários", e);
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
      throw new Exception("Erro ao deletar usuário", e);
    }
  }
}