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
import br.net.dwii.projeto.manutencao.model.dto.LoginDTO;
import br.net.dwii.projeto.manutencao.model.dto.UsuarioLogadoDTO;
import br.net.dwii.projeto.manutencao.model.exception.EmailDuplicadoException;
import br.net.dwii.projeto.manutencao.model.exception.SenhaIncorretaException;
import br.net.dwii.projeto.manutencao.model.exception.UsuarioNaoEncontradoException;

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

  private void validarUsuario(Usuario usuario) {
    if (usuario.getNome() == null || usuario.getNome().isBlank()) {
      throw new IllegalArgumentException("Nome é obrigatório");
    }

    if (usuario.getEmail() == null || usuario.getEmail().isBlank()) {
      throw new IllegalArgumentException("Email é obrigatório");
    } else if (!usuario.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
      throw new IllegalArgumentException("Email inválido");
    }
  }

  public UsuarioLogadoDTO validarLogin(LoginDTO loginDTO) throws Exception {
    Usuario usuario = usuarioDao.consultarPorEmailLogin(loginDTO.getEmail());

    if (usuario == null) {
      throw new UsuarioNaoEncontradoException(); 
    }

    String hashTentativa = gerarHash(loginDTO.getSenha(), usuario.getSalt());

    System.out.println("Senha fornecida: " + loginDTO.getSenha());
    System.out.println("Hash tentativa: " + hashTentativa);
    System.out.println("Hash banco: " + usuario.getSenha());

    if(!hashTentativa.equals(usuario.getSenha())){
      throw new SenhaIncorretaException();
    } 

    return new UsuarioLogadoDTO(
      usuario.getId(), 
      usuario.getTipo()
    );
  }

  public void inserirUsuario(Usuario usuario) throws Exception {
    validarUsuario(usuario);

    Usuario usuarioEncontrado = usuarioDao.consultarPorEmail(usuario.getEmail());

    if (usuarioEncontrado != null) {
      throw new EmailDuplicadoException(usuarioEncontrado.getEmail()); 
    }

    String salt = gerarSalt();
    usuario.setSalt(salt);
    
    /* 
     * Segue a mesma lógica da senha aleatória adicionada ao frontend para testes
     * A única mudança é o Math.abs que retira o sinal dos números, pois aqui a randomização pode vir com números negativos.
     */
    String senhaAleatoria = Long.toString(Math.abs(new java.util.Random().nextLong()), 36).substring(0, 4);

    String senhaHash = gerarHash(senhaAleatoria, salt);
    usuario.setSenha(senhaHash);

    usuarioDao.inserir(usuario);

    System.out.println("Senha gerada para teste: " + senhaAleatoria);
  }

  public void alterarUsuario(Usuario usuario, String senha, String novaSenha) throws Exception {
    validarUsuario(usuario);

    Usuario usuarioEncontrado = usuarioDao.consultar(usuario.getId());

    if (usuarioEncontrado == null) {
      throw new UsuarioNaoEncontradoException(); 
    }

    Usuario usuarioComMesmoEmail = usuarioDao.consultarPorEmail(usuario.getEmail());

    if (usuarioComMesmoEmail != null && usuarioComMesmoEmail.getId() != usuario.getId()) {
      throw new EmailDuplicadoException(usuario.getEmail());
    }

    Usuario usuarioAlterado = this.alterarSenha(usuario, senha, novaSenha);

    usuarioDao.alterar(usuarioAlterado);
  }

  public Usuario alterarSenha(Usuario usuario, String senha, String novaSenha) throws Exception {
    Usuario usuarioEncontrado = usuarioDao.consultaCompleta(usuario.getId());

    if (novaSenha != null && !novaSenha.isBlank()) {
      String hashAntiga = gerarHash(senha, usuarioEncontrado.getSalt());

      if (!hashAntiga.equals(usuarioEncontrado.getSenha())) {
        throw new SenhaIncorretaException();
      }

      String novoSalt = gerarSalt();
      String novaHash = gerarHash(novaSenha, novoSalt);

      return new Usuario(
        usuarioEncontrado.getId(),
        usuario.getNome(),
        usuario.getEmail(),
        novaHash,
        novoSalt,
        usuarioEncontrado.getTipo(),
        usuarioEncontrado.getAtivo()
      );
    }

    return new Usuario(
      usuarioEncontrado.getId(),
      usuario.getNome(),
      usuario.getEmail(),
      usuarioEncontrado.getSenha(),
      usuarioEncontrado.getSalt(),
      usuarioEncontrado.getTipo(),
      usuarioEncontrado.getAtivo()
    );
  }

  public Usuario consultarUsuario(int idUsuario) throws Exception {
    Usuario usuarioEncontrado = usuarioDao.consultar(idUsuario);

    if(usuarioEncontrado == null){
      throw new UsuarioNaoEncontradoException();
    }

    return usuarioEncontrado;
  }

  public Usuario consultaCompleta(int idUsuario) throws Exception {
    Usuario usuarioEncontrado = usuarioDao.consultaCompleta(idUsuario);

    if(usuarioEncontrado == null){
      throw new UsuarioNaoEncontradoException();
    }

    return usuarioEncontrado;
  }

  public List<Usuario> listarUsuarios() throws Exception {
    return usuarioDao.listar();
  }

  public void deletarUsuario(int idUsuario) throws Exception {
    Usuario usuarioEncontrado = this.consultarUsuario(idUsuario);

    if(usuarioEncontrado == null){
      throw new UsuarioNaoEncontradoException();
    }

    usuarioDao.deletar(idUsuario);
  }
}