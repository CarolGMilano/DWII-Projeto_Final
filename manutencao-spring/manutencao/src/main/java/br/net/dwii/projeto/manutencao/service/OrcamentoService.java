package br.net.dwii.projeto.manutencao.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Orcamento;
import br.net.dwii.projeto.manutencao.model.Servico;
import br.net.dwii.projeto.manutencao.model.dao.OrcamentoDao;
import br.net.dwii.projeto.manutencao.model.dao.ServicoDao;
import br.net.dwii.projeto.manutencao.model.dto.OrcamentoDTO;
import br.net.dwii.projeto.manutencao.model.dto.ServicoDTO;

@Service
public class OrcamentoService {

    @Autowired
    private OrcamentoDao orcamentoDao;

    @Autowired
    private ServicoDao servicoDao;

    public void inserirOrcamento(int idSolicitacao, OrcamentoDTO dto) throws Exception {
        try {
            Orcamento orcamento = new Orcamento(
                -1,
                idSolicitacao,
                dto.getValorTotal(),
                dto.getAprovada(),
                dto.getMsgRejeicao()
            );


            orcamentoDao.add(orcamento);
            int idOrcamento = orcamento.id;

            List<ServicoDTO> servicosDTO = dto.getServicos();
            if (servicosDTO != null && !servicosDTO.isEmpty()) {
                for (ServicoDTO s : servicosDTO) {
                    Servico servico = new Servico(
                        -1,
                        idOrcamento,
                        s.getDescricao(),
                        s.getPreco()
                    );
                    servicoDao.add(servico);
                }
            }
        } catch (SQLException e) {
            throw new Exception("Erro ao inserir orçamento: " + e.getMessage(), e);
        }
    }

    public Orcamento buscarPorId(int id) throws Exception {
        try {
            return orcamentoDao.getById(id);
        } catch (SQLException e) {
            throw new Exception("Erro ao buscar orçamento: " + e.getMessage(), e);
        }
    }

    public void atualizarOrcamento(Orcamento orcamento) throws Exception {
        try {
            orcamentoDao.update(orcamento);
        } catch (SQLException e) {
            throw new Exception("Erro ao atualizar orçamento: " + e.getMessage(), e);
        }
    }

    public void deletarOrcamento(int idOrcamento) throws Exception {
        try {
            servicoDao.deleteByOrcamentoId(idOrcamento);
            Orcamento orcamento = orcamentoDao.getById(idOrcamento);
            orcamentoDao.delete(orcamento);
        } catch (SQLException e) {
            throw new Exception("Erro ao deletar orçamento: " + e.getMessage(), e);
        }
    }
}
