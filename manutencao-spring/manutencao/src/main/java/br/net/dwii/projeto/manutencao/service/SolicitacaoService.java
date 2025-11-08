package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Funcionario;
import br.net.dwii.projeto.manutencao.model.dao.SolicitacaoDao;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoDTO;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoDao solicitacaoDao;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private CategoriaService categoriaService;

    private void validarSolicitacao(Solicitacao solicitacao) {
        if (solicitacao.getEquipamento() == null || solicitacao.getEquipamento().isBlank()) {
            throw new IllegalArgumentException("O campo 'equipamento' é obrigatório");
        }
        if (solicitacao.getDescricao() == null || solicitacao.getDescricao().isBlank()) {
            throw new IllegalArgumentException("A descrição é obrigatória");
        }
        if (solicitacao.getCategoria() == null) {
            throw new IllegalArgumentException("A categoria é obrigatória");
        }
        if (solicitacao.getCliente() == null) {
            throw new IllegalArgumentException("O cliente é obrigatório");
        }
        if (solicitacao.getFuncionario() == null) {
            throw new IllegalArgumentException("O funcionário é obrigatório");
        }
    }

    public SolicitacaoDTO inserirSolicitacao(SolicitacaoDTO dto) throws Exception {
        Categoria categoria = categoriaService.consultarCategoria(dto.getCategoria().getId());
        Funcionario funcionario = funcionarioService.consultarFuncionario(dto.getFuncionario().getId());
        Cliente cliente = clienteService.consultarCliente(dto.getCliente().getId());

        Solicitacao solicitacao = new Solicitacao(
            -1,
            dto.getEquipamento(),
            categoria,
            dto.getDescricao(),
            dto.getStatus(),
            cliente,
            funcionario,
            null 
        );

        validarSolicitacao(solicitacao);

        solicitacaoDao.add(solicitacao);

        ClienteResumoDTO clienteResumo = new ClienteResumoDTO(
            cliente.getNome(),        
            cliente.getCpf(),
            cliente.getTelefone(),
            null
        );

        FuncionarioResumoDTO funcionarioResumo = new FuncionarioResumoDTO(
            funcionario.getNome(),               
             funcionario.getEmail(),   
            funcionario.getCargo()   
        );

        return new SolicitacaoDTO(
            solicitacao.getId(),
            solicitacao.getEquipamento(),
            solicitacao.getCategoria().getId(),
            solicitacao.getDescricao(),
            solicitacao.getStatus(),
            null, 
            null, 
            null, 
            funcionarioResumo,
            clienteResumo
        );
    }

    public SolicitacaoDTO consultarSolicitacao(int id) throws Exception {
        Solicitacao solicitacao = solicitacaoDao.getById(id);

        if (solicitacao == null) {
            throw new Exception("Solicitação não encontrada.");
        }

        ClienteResumoDTO clienteResumo = new ClienteResumoDTO(
            solicitacao.getCliente().getNome(),
            solicitacao.getCliente().getCpf(),
            solicitacao.getCliente().getTelefone(),
            null
        );

        FuncionarioResumoDTO funcionarioResumo = new FuncionarioResumoDTO(
            solicitacao.getFuncionario().getNome(),
            solicitacao.getFuncionario().getId(),
            solicitacao.getFuncionario().getDataNascimento()
        );

        return new SolicitacaoDTO(
            solicitacao.getId(),
            solicitacao.getEquipamento(),
            solicitacao.getCategoria().getId(),
            solicitacao.getDescricao(),
            solicitacao.getStatus(),
            null,
            null,
            null,
            funcionarioResumo,
            clienteResumo
        );
    }

    public void deletarSolicitacao(int id) throws Exception {
        Solicitacao solicitacao = solicitacaoDao.getById(id);

        if (solicitacao == null) {
            throw new Exception("Solicitação não encontrada.");
        }

        solicitacaoDao.delete(solicitacao);
    }
}
