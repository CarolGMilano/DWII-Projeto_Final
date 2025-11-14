package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.Usuario;
import br.net.dwii.projeto.manutencao.model.dao.ClienteDao;
import br.net.dwii.projeto.manutencao.model.dto.ClienteDTO;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.EnderecoDTO;
import br.net.dwii.projeto.manutencao.model.exception.ClienteNaoEncontradoException;
import br.net.dwii.projeto.manutencao.model.exception.CpfDuplicadoException;

@Service
public class ClienteService {
  @Autowired
  private ClienteDao clienteDao;
  
  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private EnderecoService enderecoService;

  @Autowired
  private EmailService emailService;

  private void validarCliente(ClienteDTO cliente) {
    if (cliente.getNome() == null || cliente.getNome().isBlank()) {
      throw new IllegalArgumentException("Nome é obrigatório");
    }
    
    if (cliente.getEmail() == null || cliente.getEmail().isBlank()) {
      throw new IllegalArgumentException("Email é obrigatório");
    } else if (!cliente.getEmail().matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,6}$")) {
      throw new IllegalArgumentException("Email inválido");
    }

    if (cliente.getCpf() == null || cliente.getCpf().isBlank()) {
      throw new IllegalArgumentException("CPF é obrigatório");
    } else if (!cliente.getCpf().matches("\\d+")) {
      throw new IllegalArgumentException("O CPF deve conter apenas números");
    }

    if (cliente.getTelefone() == null || cliente.getTelefone().isBlank()) {
      throw new IllegalArgumentException("Telefone é obrigatório");
    } else if (!cliente.getTelefone().matches("\\d+")) {
      throw new IllegalArgumentException("O telefone deve conter apenas números");
    }
  }

  private void validarEndereco(EnderecoDTO endereco) {
    if (endereco.getCep() == null || endereco.getCep().isBlank()) {
      throw new IllegalArgumentException("CEP é obrigatório");
    } else if (!endereco.getCep().matches("\\d+")) {
      throw new IllegalArgumentException("O CEP deve conter apenas números");
    }

    if (endereco.getLogradouro() == null || endereco.getLogradouro().isBlank()) {
      throw new IllegalArgumentException("Logradouro é obrigatório");
    } 

    if (endereco.getBairro() == null || endereco.getBairro().isBlank()) {
      throw new IllegalArgumentException("Bairro é obrigatório");
    } 

    if (endereco.getCidade() == null || endereco.getCidade().isBlank()) {
      throw new IllegalArgumentException("Cidade é obrigatória");
    } 

    if (endereco.getEstado() == null || endereco.getEstado().isBlank()) {
      throw new IllegalArgumentException("Estado é obrigatório");
    } 
  }

  public ClienteResumoDTO inserirCliente(ClienteDTO clienteDTO) throws Exception {
    validarCliente(clienteDTO);
    validarEndereco(clienteDTO.getEndereco());
    
    Cliente clienteEncontrado = clienteDao.consultarPorCPF(clienteDTO.getCpf());
    
    if (clienteEncontrado != null) {
      throw new CpfDuplicadoException(clienteEncontrado.getCpf()); 
    }
    
    Usuario usuario = new Usuario(
      -1,
      clienteDTO.getNome(),
      clienteDTO.getEmail(),
      null,
      null,
      clienteDTO.getTipo(),
      true
    );
      
    String senhaGerada = usuarioService.inserirUsuario(usuario);
    
    Cliente cliente = new Cliente(
      -1, 
      usuario.getId(),
      clienteDTO.getCpf(),
      clienteDTO.getTelefone()
    );
      
    clienteDao.inserir(cliente);

    Endereco endereco = new Endereco(
      -1, 
      cliente.getId(), 
      clienteDTO.getEndereco().getCep(), 
      clienteDTO.getEndereco().getLogradouro(), 
      clienteDTO.getEndereco().getNumero(), 
      clienteDTO.getEndereco().getBairro(), 
      clienteDTO.getEndereco().getCidade(), 
      clienteDTO.getEndereco().getEstado()
    );

    enderecoService.inserirEndereco(endereco);

    String mensagem = """
      Olá, %s!

      Seu cadastro foi realizado com sucesso.

      Suas credenciais de acesso são:
      Usuário: %s
      Senha: %s

      Atenciosamente,
      Equipe de Manutenção
      """.formatted(
        usuario.getNome(),
        usuario.getEmail(),
        senhaGerada
      );

    emailService.enviarEmail("Seja bem-vinda(o)!", mensagem);

    return this.consultarClienteResumo(cliente.getIdUsuario());
  }

  public int consultarIdPorCPF(String cpf) throws  Exception{
    Cliente clienteEncontrado = clienteDao.consultarPorCPF(cpf);

    if (clienteEncontrado == null) {
      throw new ClienteNaoEncontradoException();
    }

    return clienteEncontrado.getId();
  }
  
  public ClienteDTO consultarCliente(int idCliente) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);

    if (clienteEncontrado == null) {
      throw new ClienteNaoEncontradoException();
    }
    
    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(idCliente);

    EnderecoDTO enderecoDTO = new EnderecoDTO(
      enderecoEncontrado.getCep(), 
      enderecoEncontrado.getLogradouro(), 
      enderecoEncontrado.getNumero(), 
      enderecoEncontrado.getBairro(), 
      enderecoEncontrado.getCidade(), 
      enderecoEncontrado.getEstado()
    );

    return new ClienteDTO(
      clienteEncontrado.getId(),
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      usuarioEncontrado.getTipo(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }

  public ClienteResumoDTO consultarClienteResumo(int idUsuario) throws Exception {
    int idCliente = this.consultarPorUsuario(idUsuario);
    Cliente clienteEncontrado = clienteDao.consultar(idCliente);

    if(clienteEncontrado == null){
      throw new ClienteNaoEncontradoException();
    }

    Usuario usuarioEncontrado = usuarioService.consultarUsuario(clienteEncontrado.getIdUsuario());
    Endereco enderecoEncontrado = enderecoService.consultarEndereco(clienteEncontrado.getId());

    EnderecoDTO enderecoDTO = new EnderecoDTO(
      enderecoEncontrado.getCep(), 
      enderecoEncontrado.getLogradouro(), 
      enderecoEncontrado.getNumero(), 
      enderecoEncontrado.getBairro(), 
      enderecoEncontrado.getCidade(), 
      enderecoEncontrado.getEstado()
    );

    return new ClienteResumoDTO(
      usuarioEncontrado.getNome(),
      usuarioEncontrado.getEmail(),
      clienteEncontrado.getCpf(),
      clienteEncontrado.getTelefone(),
      enderecoDTO
    );
  }

  public int consultarPorUsuario(int idUsuario) throws Exception {
    Cliente clienteEncontrado = clienteDao.consultarPorUsuario(idUsuario);

    if(clienteEncontrado == null){
      throw new ClienteNaoEncontradoException();
    }

    return clienteEncontrado.getId();
  }
}