package br.net.dwii.projeto.manutencao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Servico;
import br.net.dwii.projeto.manutencao.model.dao.ServicoDao;
import br.net.dwii.projeto.manutencao.model.dto.ServicoDTO;

@Service
public class ServicoService {

    @Autowired
    private ServicoDao servicoDao;

    public void inserirServico(int idOrcamento, ServicoDTO dto) throws Exception {
        if (dto.getDescricao() == null || dto.getDescricao().isEmpty()) {
            throw new Exception("A descrição do serviço não pode estar vazia.");
        }

        if (dto.getPreco() <= 0) {
            throw new Exception("O preço do serviço deve ser maior que zero.");
        }

        Servico servico = new Servico(0, idOrcamento, dto.getDescricao(), dto.getPreco());
        servicoDao.add(servico);
    }

    public void atualizarServico(int id, ServicoDTO dto) throws Exception {
        Servico servicoExistente = servicoDao.getById(id);

        if (servicoExistente == null) {
            throw new Exception("Serviço não encontrado.");
        }

        servicoExistente.setDescricao(dto.getDescricao());
        servicoExistente.setPreco(dto.getPreco());

        servicoDao.update(servicoExistente);
    }

    public void deletarServico(int id) throws Exception {
        Servico servico = servicoDao.getById(id);
        if (servico == null) {
            throw new Exception("Serviço não encontrado.");
        }
        servicoDao.delete(id);
    }

    public void deletarServicosPorOrcamento(int idOrcamento) throws Exception {
        servicoDao.deleteByOrcamentoId(idOrcamento);
    }

    public Servico buscarPorId(int id) throws Exception {
        return servicoDao.getById(id);
    }

    public List<Servico> listarPorOrcamento(int idOrcamento) throws Exception {
        return servicoDao.getByOrcamentoId(idOrcamento);
    }
}
