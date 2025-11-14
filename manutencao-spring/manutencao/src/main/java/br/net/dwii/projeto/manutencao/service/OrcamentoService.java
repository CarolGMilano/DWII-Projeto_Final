package br.net.dwii.projeto.manutencao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Orcamento;
import br.net.dwii.projeto.manutencao.model.dao.OrcamentoDao;
import br.net.dwii.projeto.manutencao.model.dto.OrcamentoDTO;
import br.net.dwii.projeto.manutencao.model.dto.ServicoDTO;

@Service
public class OrcamentoService {
  @Autowired
  private OrcamentoDao orcamentoDao;

  @Autowired
  private ServicoService servicoService;

  public OrcamentoDTO inserirOrcamento(OrcamentoDTO orcamentoDTO, int idSolicitacao) throws Exception {
    double valorTotal = 0.0;

    if (orcamentoDTO.getServicos() != null) {
      for (ServicoDTO servicoDTO : orcamentoDTO.getServicos()) {
        valorTotal += servicoDTO.getPreco();
      }
    }

    Orcamento orcamento = new Orcamento(
      -1,
      idSolicitacao,
      valorTotal,
      orcamentoDTO.getAprovada(),
      orcamentoDTO.getMsgRejeicao()
    );
    
    orcamentoDao.inserir(orcamento);

    if (orcamentoDTO.getServicos() != null) {
      for (ServicoDTO servicoDTO : orcamentoDTO.getServicos()) {
        servicoService.inserirServico(servicoDTO, orcamento.getId());
      }
    }

    return this.consultarOrcamento(idSolicitacao);
  }   

  public OrcamentoDTO consultarOrcamento(int idSolicitacao) throws Exception {
    Orcamento orcamentoEncontrado = orcamentoDao.consultar(idSolicitacao);

    if (orcamentoEncontrado == null) {
      return null;
    }

    List<ServicoDTO> servicosEncontrados = servicoService.listarServicos(orcamentoEncontrado.getId());

    return new OrcamentoDTO(
      servicosEncontrados, 
      orcamentoEncontrado.getValorTotal(), 
      orcamentoEncontrado.getAprovado(), 
      orcamentoEncontrado.getMsgRejeicao()
    );
  }

  public OrcamentoDTO alterarAprovacao(OrcamentoDTO orcamentoDTO, int idSolicitacao) throws Exception {
    Orcamento orcamentoEncontrado = orcamentoDao.consultar(idSolicitacao);
    
    orcamentoEncontrado.setAprovado(orcamentoDTO.getAprovada());
    orcamentoEncontrado.setMsgRejeicao(orcamentoDTO.getMsgRejeicao());

    orcamentoDao.alterarAprovacao(orcamentoEncontrado);

    return this.consultarOrcamento(idSolicitacao);
  }
}
