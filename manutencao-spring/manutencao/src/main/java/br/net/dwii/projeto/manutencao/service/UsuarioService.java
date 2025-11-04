package br.net.dwii.projeto.manutencao.service;

//Importações para criptografia das senhas
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Usuario;
import br.net.dwii.projeto.manutencao.model.dao.UsuarioDao;

@Service
public class UsuarioService {
  @Autowired
  private UsuarioDao usuarioDao;

  /*
   * Salt é um valor aleatório que é concatenado com a senha antes da criptografia
   * para deixar a senha mais segura e garantir hashes diferentes para senhas iguais.
   */
  private String gerarSalt() {
    //Cria um array de bytes
    byte[] salt = new byte[16];
    //O SecureRandom é uma maneira menos previsível de gerar números aleatórios
    new SecureRandom().nextBytes(salt);

    //Pega o salt gerado, transforma os bytes em uma string legível e retorna.
    return Base64.getEncoder().encodeToString(salt);
  }

  //Cria a senha criptografada
  private String gerarHash(String senha, String salt) throws NoSuchAlgorithmException {
    //Junta a senha sem criptografia com a salt criada
    String senhaConcatenada = senha + salt;

    //Aqui que fica o algoritmo do SHA-256
    MessageDigest algoritmoSHA256 = MessageDigest.getInstance("SHA-256");

    //Converte em bytes, seguindo o UTF-8, e depois calcula o hash com o algorítimo SHA-256 do Java
    byte[] hashEmBytes = algoritmoSHA256.digest(senhaConcatenada.getBytes(StandardCharsets.UTF_8));

    //Maneira eficiênte de criar uma string concatenada.
    StringBuilder hashHexa = new StringBuilder();

    for (byte b : hashEmBytes) {
      //Aqui ele vai converter cada byte em hexadecimal de 2 dígitos
      hashHexa.append(String.format("%02x", b));
    }

    //Retorna esse hexadecimal da senha + salt. Essa é a senha criptografada, ela não poderá ser revertida.
    return hashHexa.toString();
  }

  private void validarUsuario(Usuario usuario) throws Exception {
    if (usuario.getNome() == null || usuario.getNome().isBlank()) {
      throw new Exception("Nome é obrigatório");
    }

    if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
      throw new Exception("Email é obrigatório");
    } else if (!usuario.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
      throw new Exception("Email inválido");
    }

    if (usuario.getSenha() == null || usuario.getSenha().length() < 4) {
      throw new Exception("Senha deve ter, pelo menos, 4 caracteres");
    }
  }

  public boolean validarLogin(String email, String senhaInformada) throws Exception {
    Usuario usuario = usuarioDao.consultarPorEmail(email);

    if (usuario == null) {
      throw new Exception("Usuário não encontrado!"); 
    }

    String hashTentativa = gerarHash(senhaInformada, usuario.getSalt());

    return hashTentativa.equals(usuario.getSenha());
  }

  public void inserirUsuario(Usuario usuario) throws Exception {
    validarUsuario(usuario);

    Usuario usuarioEncontrado = usuarioDao.consultarPorEmail(usuario.getEmail());

    if (usuarioEncontrado != null) {
      throw new Exception("Email já cadastrado"); 
    }

    String salt = gerarSalt();
    usuario.setSalt(salt);

    String senhaHash = gerarHash(usuario.getSenha(), salt);
    usuario.setSenha(senhaHash);

    usuarioDao.inserir(usuario);
  }

  public void alterarUsuario(Usuario usuario) throws Exception {
    validarUsuario(usuario);

    Usuario usuarioEncontrado = usuarioDao.consultarPorEmail(usuario.getEmail());

    if (usuarioEncontrado != null && usuarioEncontrado.getId() != usuario.getId()) {
      throw new Exception("Email já cadastrado"); 
    }

    usuarioDao.alterar(usuario);
  }

  public Usuario consultarUsuario(int idUsuario) throws Exception {
    return usuarioDao.consultar(idUsuario);
  }

  public List<Usuario> listarUsuarios() throws Exception {
    return usuarioDao.listar();
  }

  public void deletarUsuario(int idUsuario) throws Exception {
    usuarioDao.deletar(idUsuario);
  }
}