package br.net.dwii.projeto.manutencao.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.net.dwii.projeto.manutencao.intefaces.ICrud;
import br.net.dwii.projeto.manutencao.model.Categoria;
import br.net.dwii.projeto.manutencao.model.Cliente;
import br.net.dwii.projeto.manutencao.model.Funcionario;
import br.net.dwii.projeto.manutencao.model.Orcamento;
import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.model.dao.CategoriaDao;
import br.net.dwii.projeto.manutencao.model.dao.ClienteDao;
import br.net.dwii.projeto.manutencao.model.dao.FuncionarioDao;
import br.net.dwii.projeto.manutencao.model.dao.OrcamentoDao;
import br.net.dwii.projeto.manutencao.model.dao.SolicitacaoDao;

public class SolicitacaoService implements ICrud<Solicitacao>{
    @Autowired
    private SolicitacaoDao solicitacaoDao;

    @Autowired
    private ClienteDao clienteDao = new ClienteDao();

    @Autowired
    private FuncionarioDao funcionarioDao = new FuncionarioDao();

    @Autowired
    private CategoriaDao categoriaDao = new CategoriaDao();

    @Autowired
    private OrcamentoDao orcamentoDao = new OrcamentoDao();

    @Override
    public Solicitacao buscarPorId(int id) {
        try {
            return solicitacaoDao.getById(id);
        } catch (Exception e) {
            e.printStackTrace(); //comando usado para mostrar o rastreamento completo do erro no console quando uma exceção (Exception e) é capturada.
            return null;
        }    
    }

    @Override
    public Solicitacao buscarPorNome(String nome) {
        throw new UnsupportedOperationException("Unimplemented method 'existeId'");

    }

    @Override
    public boolean existeId(int id) {
        return buscarPorId(id) != null;
    }

    @Override
    public boolean existeNome(String nome) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'existeNome'");
    }

    public Solicitacao salvar(Solicitacao solicitacao) throws Exception{

        if (solicitacao.getCliente() == null || solicitacao.getCliente().getId() == 0) {
            throw new Exception("Cliente não informado na solicitação.");
        }
        if (solicitacao.getFuncionario() == null || solicitacao.getFuncionario().getId() == 0) {
            throw new Exception("Funcionário responsável não informado.");
        }
        if (solicitacao.getCategoria() == null || solicitacao.getCategoria().getId() == 0) {
            throw new Exception("Categoria inválida.");
        }

        Cliente cliente = clienteDao.consultar(solicitacao.getCliente().getId());
        Funcionario funcionario = funcionarioDao.consultar(solicitacao.getFuncionario().getId());
        Categoria categoria = categoriaDao.getById(solicitacao.getCategoria().getId());
        Orcamento orcamento = null;

        if (solicitacao.getOrcamento() != null && solicitacao.getOrcamento().getId() != 0) {
            orcamento = orcamentoDao.getById(solicitacao.getOrcamento().getId());
        }

        if (cliente == null) throw new Exception("Cliente não encontrado.");
        if (funcionario == null) throw new Exception("Funcionário não encontrado.");
        if (categoria == null) throw new Exception("Categoria não encontrada.");

        Solicitacao nova = new Solicitacao(
            0,
            solicitacao.getEquipamento(),
            categoria,
            solicitacao.getDescricao(),
            solicitacao.getStatus().intValue(),
            cliente,
            funcionario,
            new Date(System.currentTimeMillis())
        );

        nova.setOrcamento(orcamento);

        solicitacaoDao.add(nova);

        return nova;
    }

    @Override
    public List<Solicitacao> listar() {
          try {
            return solicitacaoDao.getAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }  }

    @Override
    public boolean deletar(int id) {
        Solicitacao solicitacao = buscarPorId(id);
        try {
            solicitacaoDao.delete(solicitacao);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Solicitacao atualizar(Solicitacao solicitacao, int id) {
        try {
            Solicitacao existente = solicitacaoDao.getById(id);

            if (existente != null) {
                existente.setEquipamento(solicitacao.getEquipamento());
                existente.setCategoria(solicitacao.getCategoria());
                existente.setDescricao(solicitacao.getDescricao());
                existente.setStatus((Integer) solicitacao.getStatus());
                existente.setCliente(solicitacao.getCliente());
                existente.setFuncionario(solicitacao.getFuncionario());
                existente.setOrcamento(solicitacao.getOrcamento());
                existente.setHistorico(solicitacao.getHistorico());
                existente.setDataAbertura(solicitacao.getDataAbertura());

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
