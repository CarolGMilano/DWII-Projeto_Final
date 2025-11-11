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

  private void validarOrcamento(Orcamento orcamento) {
    //Como ele não é um boolean primitivo, preciso descobrir se o falso é um false verdadeiro ou um null.
    Boolean status = orcamento.getAprovado();

    if (Boolean.FALSE.equals(status) && (orcamento.getMsgRejeicao() == null || orcamento.getMsgRejeicao().isBlank())) {
      throw new IllegalArgumentException("Mensagem de rejeição é obrigatória para orçamentos reprovados");
    }

    if (orcamento.getValorTotal() <= 0) {
      throw new IllegalArgumentException("Valor total deve ser maior que zero");
    }
  }

  public OrcamentoDTO inserirOrcamento(OrcamentoDTO orcamentoDTO, int idSolicitacao) throws Exception {
    Orcamento orcamento = new Orcamento(
      -1,
      idSolicitacao,
      orcamentoDTO.getValorTotal(),
      orcamentoDTO.getAprovada(),
      orcamentoDTO.getMsgRejeicao()
    );

    validarOrcamento(orcamento);
    
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
    
    Orcamento novoOrcamento = new Orcamento(
      orcamentoEncontrado.getId(),
      orcamentoEncontrado.getIdSolicitacao(),
      orcamentoEncontrado.getValorTotal(),
      orcamentoDTO.getAprovada(),
      orcamentoDTO.getMsgRejeicao()
    );

    validarOrcamento(novoOrcamento);

    orcamentoDao.alterarAprovacao(novoOrcamento);

    return this.consultarOrcamento(idSolicitacao);
  }
}
