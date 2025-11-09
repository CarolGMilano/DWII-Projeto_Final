package br.net.dwii.projeto.manutencao.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Funcionario;
import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.model.dao.CategoriaDao;
import br.net.dwii.projeto.manutencao.model.dao.ClienteDao;
import br.net.dwii.projeto.manutencao.model.dao.FuncionarioDao;
import br.net.dwii.projeto.manutencao.model.dao.OrcamentoDao;
import br.net.dwii.projeto.manutencao.model.dao.SolicitacaoDao;
import br.net.dwii.projeto.manutencao.model.dto.HistoricoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoDTO;

@Service
public class SolicitacaoService {

    @Autowired
    private SolicitacaoDao solicitacaoDao;

    @Autowired
    private ClienteDao clienteDao;

    @Autowired
    private FuncionarioDao funcionarioDao;

    @Autowired
    private CategoriaDao categoriaDao;

    @Autowired
    private OrcamentoDao orcamentoDao;

    public Solicitacao buscarPorId(int id) {
        try {
            return solicitacaoDao.getById(id);
        } catch (Exception e) {
            e.printStackTrace(); //comando usado para mostrar o rastreamento completo do erro no console quando uma exceção (Exception e) é capturada.
            return null;
        }
    }

    public Solicitacao buscarPorNome(String nome) {
        throw new UnsupportedOperationException("Unimplemented method 'existeId'");

    }

    public boolean existeId(int id) {
        return buscarPorId(id) != null;
    }

    public Solicitacao salvar(SolicitacaoDTO solicitacao) throws Exception {

        if (solicitacao.getCliente() == null || solicitacao.getCliente().getId() == 0) {
            throw new Exception("Cliente não informado na solicitação.");
        }
        if (solicitacao.getFuncionario() == null || solicitacao.getFuncionario().getId() == 0) {
            throw new Exception("Funcionário responsável não informado.");
        }
        if (solicitacao.getCategoria() == 0) {
            throw new Exception("Categoria inválida.");
        }

        Cliente cliente = clienteDao.consultar(solicitacao.getCliente().getId());
        Funcionario funcionario = funcionarioDao.consultar(solicitacao.getFuncionario().getId());
        Categoria categoria = categoriaDao.getById(solicitacao.getCategoria());
        List<HistoricoDTO> historico = new ArrayList<>();

        // Orcamento orcamento = null;
        // if (solicitacao.getOrcamento() != null && solicitacao.getOrcamento().getId() != 0) {
        //     orcamento = orcamentoDao.getById(solicitacao.getOrcamento().getId());
        // }
        if (cliente == null) {
            throw new Exception("Cliente não encontrado.");
        }
        if (funcionario == null) {
            throw new Exception("Funcionário não encontrado.");
        }
        if (categoria == null) {
            throw new Exception("Categoria não encontrada.");
        }

        Solicitacao nova = new Solicitacao(
                solicitacao.getId(),
                solicitacao.getEquipamento(),
                solicitacao.getCategoria(),
                solicitacao.getDescricao(),
                solicitacao.getStatus(),
                solicitacao.getFuncionario().getId(),
                solicitacao.getCliente().getId()
        );

        // nova.setOrcamento(orcamento);
        solicitacaoDao.add(nova);

        return nova;
    }

    public List<Solicitacao> listar() {
        try {
            return solicitacaoDao.getAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deletar(int id) {
        Solicitacao solicitacao = buscarPorId(id);

        if (solicitacao == null) {
            System.err.println("Solicitação com ID " + id + " não encontrada.");
            return false;
        }

        try {
            solicitacaoDao.delete(solicitacao);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Solicitacao atualizar(Solicitacao solicitacao, int id) {
        try {
            Solicitacao existente = solicitacaoDao.getById(id);

            if (existente != null) {
                existente.setEquipamento(solicitacao.getEquipamento());
                existente.setIdCategoria(solicitacao.getIdCategoria());
                existente.setDescricao(solicitacao.getDescricao());
                existente.setIdStatus(solicitacao.getIdStatus());
                existente.setIdCliente(solicitacao.getIdCliente());
                existente.setIdFuncionario(solicitacao.getIdFuncionario());
                // existente.setOrcamento(solicitacao.getIdOrcamento());
                // existente.setHistorico(solicitacao.getIdHistorico());
                // existente.setDataAbertura(solicitacao.getDataAbertura());

                solicitacaoDao.update(existente);

                return existente;
            } else {
                System.err.println("Solicitação com ID " + id + " não encontrada.");
                return null;
            }

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
