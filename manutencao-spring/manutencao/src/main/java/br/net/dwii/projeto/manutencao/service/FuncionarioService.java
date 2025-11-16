package br.net.dwii.projeto.manutencao.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Funcionario;
import br.net.dwii.projeto.manutencao.model.Usuario;
import br.net.dwii.projeto.manutencao.model.dao.FuncionarioDao;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioDTO;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.exception.FuncionarioNaoEncontradoException;

@Service
public class FuncionarioService {
  @Autowired
  private FuncionarioDao funcionarioDao;

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EmailService emailService;

  private void validarFuncionario(FuncionarioDTO funcionario) {
    if (funcionario.getNome() == null || funcionario.getNome().isBlank()) {
      throw new IllegalArgumentException("Nome é obrigatório");
    }
    
    if (funcionario.getEmail() == null || funcionario.getEmail().isBlank()) {
      throw new IllegalArgumentException("Email é obrigatório");
    } else if (!funcionario.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
      throw new IllegalArgumentException("Email inválido");
    }

    if (funcionario.getDataNascimento() == null) {
      throw new IllegalArgumentException("Data de nascimento é obrigatória");
    } else if (funcionario.getDataNascimento().after(new Date(System.currentTimeMillis()))) {
      throw new IllegalArgumentException("Data de nascimento não pode ser futura");
    }
  }

  public FuncionarioResumoDTO inserirFuncionario(FuncionarioDTO funcionarioDTO) throws Exception {
    validarFuncionario(funcionarioDTO);
    
    Usuario usuario = new Usuario(
      -1,
      funcionarioDTO.getNome(),
      funcionarioDTO.getEmail(),
      null,
      null,
      funcionarioDTO.getTipo(),
      true
    );
      
    String senhaGerada = usuarioService.inserirUsuario(usuario);
    
    Funcionario funcionario = new Funcionario(
      -1, 
      usuario.getId(),
      funcionarioDTO.getDataNascimento()
    );
      
    funcionarioDao.inserir(funcionario);

    String mensagem = """
      Olá, %s!

      Seu cadastro como funcionário foi realizado com sucesso.

      Suas credenciais de acesso ao sistema são:
      Usuário: %s
      Senha: %s

      Recomendamos que você altere sua senha no primeiro acesso no painel "Funcionários".

      Atenciosamente,
      Equipe de Manutenção
      """.formatted(
        usuario.getNome(),
        usuario.getEmail(),
        senhaGerada
      );

    emailService.enviarEmail("Acesso de funcionário liberado", mensagem);

    return this.consultarFuncionarioResumo(funcionario.getId());
  }

  public FuncionarioResumoDTO consultarFuncionarioResumo(int idFuncionario) throws Exception {
    Funcionario funcionarioEncontrado = funcionarioDao.consultar(idFuncionario);

    if(funcionarioEncontrado == null){
      throw new FuncionarioNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(funcionarioEncontrado.getIdUsuario());

    return new FuncionarioResumoDTO(
      funcionarioEncontrado.getId(),
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      funcionarioEncontrado.getDataNascimento()
    );
  }

  public FuncionarioResumoDTO consultarFuncionarioResumoPorUsuario(int idUsuario) throws Exception {
    int idFuncionario = this.consultarPorUsuario(idUsuario);
    Funcionario funcionarioEncontrado = funcionarioDao.consultar(idFuncionario);

    if(funcionarioEncontrado == null){
      throw new FuncionarioNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(funcionarioEncontrado.getIdUsuario());

    return new FuncionarioResumoDTO(
      funcionarioEncontrado.getId(),
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      funcionarioEncontrado.getDataNascimento()
    );
  }

  public int consultarPorUsuario(int idUsuario) throws Exception {
    Funcionario funcionarioEncontrado = funcionarioDao.consultarPorUsuario(idUsuario);

    if(funcionarioEncontrado == null){
      throw new FuncionarioNaoEncontradoException();
    }

    return funcionarioEncontrado.getId();
  }

  public FuncionarioResumoDTO alterarFuncionario(FuncionarioDTO funcionarioDTO) throws Exception {
    validarFuncionario(funcionarioDTO);

    Funcionario funcionarioEncontrado = funcionarioDao.consultar(funcionarioDTO.getIdFuncionario());

    if (funcionarioEncontrado == null) {
      throw new FuncionarioNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultaCompleta(funcionarioEncontrado.getIdUsuario());

    usuarioEncontrado.setNome(funcionarioDTO.getNome());
    usuarioEncontrado.setEmail(funcionarioDTO.getEmail());
    usuarioService.alterarUsuario(usuarioEncontrado, funcionarioDTO.getSenha(), funcionarioDTO.getNovaSenha()); 
        
    funcionarioEncontrado.setDataNascimento(funcionarioDTO.getDataNascimento());
    funcionarioDao.alterar(funcionarioEncontrado); 

    return new FuncionarioResumoDTO(
      funcionarioEncontrado.getId(),
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      funcionarioEncontrado.getDataNascimento()
    );
  }

  public List<FuncionarioResumoDTO> listarFuncionarios() throws Exception {
    List<FuncionarioResumoDTO> funcionarios = new ArrayList<>();

    for (Funcionario funcionario : funcionarioDao.listar()) {
      Usuario usuarioEncontrado = usuarioService.consultarUsuario(funcionario.getIdUsuario());

      funcionarios.add(
        new FuncionarioResumoDTO(
          funcionario.getId(), 
          usuarioEncontrado.getNome(), 
          usuarioEncontrado.getEmail(), 
          funcionario.getDataNascimento()
        )
      );
    }

    return funcionarios;
  }

  public void deletarFuncionario (int idFuncionario) throws Exception {
    Funcionario funcionarioEncontrado = funcionarioDao.consultar(idFuncionario);
    
    if (funcionarioEncontrado == null) {
      throw new FuncionarioNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(funcionarioEncontrado.getIdUsuario());

    usuarioService.deletarUsuario(usuarioEncontrado.getId());
  }
}