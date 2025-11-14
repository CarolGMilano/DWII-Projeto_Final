package br.net.dwii.projeto.manutencao.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.model.SolicitacaoStatusEnum;
import br.net.dwii.projeto.manutencao.model.dao.SolicitacaoDao;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.HistoricoDTO;
import br.net.dwii.projeto.manutencao.model.dto.ManutencaoDTO;
import br.net.dwii.projeto.manutencao.model.dto.OrcamentoDTO;
import br.net.dwii.projeto.manutencao.model.dto.ServicoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoEntradaDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoResumoDTO;
import br.net.dwii.projeto.manutencao.model.exception.SolicitacaoNaoEncontradaException;

@Service
public class SolicitacaoService {

  @Autowired
  private SolicitacaoDao solicitacaoDao;
  
  @Autowired
  private ClienteService clienteService;

  @Autowired
  private FuncionarioService funcionarioService;

  @Autowired
  private OrcamentoService orcamentoService;

  @Autowired
  private HistoricoService historicoService;

  @Autowired
  private ManutencaoService manutencaoService;

  private void validarSolicitacao(Solicitacao solicitacao) {
    if (solicitacao.getEquipamento() == null || solicitacao.getEquipamento().isBlank()) {
      throw new IllegalArgumentException("Equipamento é obrigatório");
    }

    if (solicitacao.getDescricao() == null || solicitacao.getDescricao().isBlank()) {
      throw new IllegalArgumentException("Descrição é obrigatório");
    }
  }

  private void validarOrcamento(OrcamentoDTO orcamento) {
    //Como ele não é um boolean primitivo, preciso descobrir se o falso é um false verdadeiro ou um null.
    Boolean status = orcamento.getAprovada();

    if (Boolean.FALSE.equals(status) && (orcamento.getMsgRejeicao() == null || orcamento.getMsgRejeicao().isBlank())) {
      throw new IllegalArgumentException("Mensagem de rejeição é obrigatória para orçamentos reprovados");
    }

    if (orcamento.getValorTotal() <= 0) {
      throw new IllegalArgumentException("Valor total deve ser maior que zero");
    }
  }

  private void validarServico(ServicoDTO servico) {
    if (servico.getDescricao() == null || servico.getDescricao().isBlank()) {
      throw new IllegalArgumentException("Descrição é obrigatória");
    }

    if (servico.getPreco() <= 0) {
      throw new IllegalArgumentException("Preço deve ser maior que zero");
    }
  }

  private void validarManutencao(ManutencaoDTO manutencao) {
    if (manutencao.getDescricao() == null || manutencao.getDescricao().isBlank()) {
      throw new IllegalArgumentException("Descrição é obrigatória");
    } 

    if (manutencao.getOrientacao() == null || manutencao.getOrientacao().isBlank()) {
      throw new IllegalArgumentException("Orientação é obrigatória");
    }
  }

  public SolicitacaoDTO inserirSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    int idCliente = clienteService.consultarPorUsuario(solicitacaoEntradaDTO.getCliente());

    Solicitacao solicitacao = new Solicitacao(
      -1, 
      solicitacaoEntradaDTO.getEquipamento(), 
      solicitacaoEntradaDTO.getCategoria(), 
      solicitacaoEntradaDTO.getDescricao(), 
      SolicitacaoStatusEnum.ABERTA.getValor(), 
      -1, 
      idCliente
    );

    validarSolicitacao(solicitacao);

    solicitacaoDao.inserir(solicitacao);

    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacao.getIdStatus(),
      null,
      null
    );

    historicoService.inserirHistorico(historico, solicitacao.getId());


/* 
    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(historicos.size() - 1);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }*/

    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO consultarSolicitacaoCompleta(int idSolicitacao) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(idSolicitacao);

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    List<HistoricoDTO> historicos = historicoService.listarHistorico(idSolicitacao);
    OrcamentoDTO orcamentoEncontrado = orcamentoService.consultarOrcamento(idSolicitacao);
    ManutencaoDTO manutencaoEncontrada = manutencaoService.consultarManutencao(idSolicitacao);

    FuncionarioResumoDTO funcionarioEncontrado = null;
    
    if (solicitacaoEncontrada.getIdFuncionario() != null && solicitacaoEncontrada.getIdFuncionario() > 0) {
      funcionarioEncontrado = funcionarioService.consultarFuncionarioResumo(solicitacaoEncontrada.getIdFuncionario());
    }

    ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumo(solicitacaoEncontrada.getIdCliente());

    return new SolicitacaoDTO(
      solicitacaoEncontrada.getId(), 
      solicitacaoEncontrada.getEquipamento(), 
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(), 
      solicitacaoEncontrada.getIdStatus(), 
      historicos, 
      orcamentoEncontrado, 
      manutencaoEncontrada, 
      funcionarioEncontrado, 
      clienteEncontrado
    );
  }

  public List<SolicitacaoResumoDTO> listar() throws Exception {
    List<Solicitacao> solicitacoes = solicitacaoDao.listar();
    List<SolicitacaoResumoDTO> solicitacoesResumoDTO = new ArrayList<>();

    for (Solicitacao solicitacao : solicitacoes) {
      List<HistoricoDTO> historicos = historicoService.listarHistorico(solicitacao.getId());
      ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumo(solicitacao.getIdCliente());

      LocalDateTime dataAbertura = null;

      for (HistoricoDTO historico : historicos) {
        if (historico.getStatus() == SolicitacaoStatusEnum.ABERTA.getValor()) {
          dataAbertura = historico.getDataHora();

          break; 
        }
      }

      solicitacoesResumoDTO.add(
        new SolicitacaoResumoDTO(
          solicitacao.getId(), 
          solicitacao.getEquipamento(), 
          solicitacao.getIdStatus(), 
          dataAbertura, 
          clienteEncontrado
        )
      );
    }

    return solicitacoesResumoDTO;
  }

  public List<SolicitacaoResumoDTO> listarPorFuncionario(int idUsuario) throws Exception {
    int idFuncionario = funcionarioService.consultarPorUsuario(idUsuario); 
    
    List<Solicitacao> solicitacoes = solicitacaoDao.listarPorFuncionario(idFuncionario);
    List<SolicitacaoResumoDTO> solicitacoesResumoDTO = new ArrayList<>();

    for (Solicitacao solicitacao : solicitacoes) {
      List<HistoricoDTO> historicos = historicoService.listarHistorico(solicitacao.getId());
      ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumo(solicitacao.getIdCliente());

      LocalDateTime dataAbertura = null;

      for (HistoricoDTO historico : historicos) {
        if (historico.getStatus() == 1) {
          dataAbertura = historico.getDataHora();

          break; 
        }
      }

      solicitacoesResumoDTO.add(
        new SolicitacaoResumoDTO(
          solicitacao.getId(), 
          solicitacao.getEquipamento(), 
          solicitacao.getIdStatus(), 
          dataAbertura, 
          clienteEncontrado
        )
      );
    }

    return solicitacoesResumoDTO;
  }

  public List<SolicitacaoResumoDTO> listarPorCliente(int idUsuario) throws Exception {
    int idCliente = clienteService.consultarPorUsuario(idUsuario);
    
    List<Solicitacao> solicitacoes = solicitacaoDao.listarPorCliente(idCliente);
    List<SolicitacaoResumoDTO> solicitacoesResumoDTO = new ArrayList<>();

    for (Solicitacao solicitacao : solicitacoes) {
      List<HistoricoDTO> historicos = historicoService.listarHistorico(solicitacao.getId());
      ClienteResumoDTO clienteEncontrado = clienteService.consultarClienteResumo(solicitacao.getIdCliente());

      LocalDateTime dataAbertura = null;

      for (HistoricoDTO historico : historicos) {
        if (historico.getStatus() == SolicitacaoStatusEnum.ABERTA.getValor()) {
          dataAbertura = historico.getDataHora();

          break; 
        }
      }

      solicitacoesResumoDTO.add(
        new SolicitacaoResumoDTO(
          solicitacao.getId(), 
          solicitacao.getEquipamento(), 
          solicitacao.getIdStatus(), 
          dataAbertura, 
          clienteEncontrado
        )
      );
    }

    return solicitacoesResumoDTO;
  }

  public SolicitacaoDTO orçarSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    validarOrcamento(solicitacaoEntradaDTO.getOrcamento());

    for(ServicoDTO servico : solicitacaoEntradaDTO.getOrcamento().getServicos()){
      validarServico(servico);
    }

    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    int idFuncionario = funcionarioService.consultarPorUsuario(solicitacaoEntradaDTO.getFuncionario()); 
    FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarFuncionarioResumo(idFuncionario);

    solicitacaoEncontrada.setIdStatus(SolicitacaoStatusEnum.ORCADA.getValor());
    solicitacaoEncontrada.setIdFuncionario(idFuncionario);

    solicitacaoDao.alterarStatus(solicitacaoEncontrada);
    solicitacaoDao.alterarFuncionario(solicitacaoEncontrada);

    orcamentoService.inserirOrcamento(solicitacaoEntradaDTO.getOrcamento(), solicitacaoEncontrada.getId());

    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacaoEncontrada.getIdStatus(),
      funcionarioEncontrado,
      null
    );

    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());
    
    return consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }

  public SolicitacaoDTO finalizarOrcamento(SolicitacaoEntradaDTO solicitacaoEntradaDTO, int status) throws Exception {
    validarOrcamento(solicitacaoEntradaDTO.getOrcamento());

    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());
    
    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }
    
    OrcamentoDTO orcamentoDTO = orcamentoService.consultarOrcamento(solicitacaoEncontrada.getId());
    
    solicitacaoEncontrada.setIdStatus(status);

    solicitacaoDao.alterarStatus(solicitacaoEncontrada);

    if(status == SolicitacaoStatusEnum.APROVADA.getValor()){
      orcamentoDTO.setAprovada(true);
      orcamentoDTO.setMsgRejeicao(null);
    } else if(status == SolicitacaoStatusEnum.REJEITADA.getValor()) {
      orcamentoDTO.setAprovada(false);
      orcamentoDTO.setMsgRejeicao(solicitacaoEntradaDTO.getOrcamento().getMsgRejeicao());
    }

    orcamentoService.alterarAprovacao(orcamentoDTO, solicitacaoEncontrada.getId());

    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      status,
      null,
      null
    );

    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());

    return this.consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }

  public SolicitacaoDTO redirecionarSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    FuncionarioResumoDTO funcionarioOrigem = funcionarioService.consultarFuncionarioResumo(solicitacaoEncontrada.getIdFuncionario());
    FuncionarioResumoDTO funcionarioDestino = funcionarioService.consultarFuncionarioResumo(solicitacaoEntradaDTO.getFuncionario());

    solicitacaoEncontrada.setIdStatus(SolicitacaoStatusEnum.REDIRECIONADA.getValor());
    solicitacaoEncontrada.setIdFuncionario(solicitacaoEntradaDTO.getFuncionario());
    
    solicitacaoDao.alterarStatus(solicitacaoEncontrada);
    solicitacaoDao.alterarFuncionario(solicitacaoEncontrada);

    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacaoEncontrada.getIdStatus(),
      funcionarioOrigem,
      funcionarioDestino
    );
    
    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());

    return this.consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }

  public SolicitacaoDTO arrumarSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    validarManutencao(solicitacaoEntradaDTO.getManutencao());

    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    int idFuncionario = funcionarioService.consultarPorUsuario(solicitacaoEntradaDTO.getFuncionario()); 
    FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarFuncionarioResumo(idFuncionario);

    solicitacaoEncontrada.setIdStatus(SolicitacaoStatusEnum.ARRUMADA.getValor());

    solicitacaoDao.alterarStatus(solicitacaoEncontrada);

    manutencaoService.inserirManutencao(solicitacaoEntradaDTO.getManutencao(), solicitacaoEncontrada.getId());

    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacaoEncontrada.getIdStatus(),
      funcionarioEncontrado,
      null
    );

    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());

    return this.consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }

  public SolicitacaoDTO pagarSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());
  
    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }
  
    solicitacaoEncontrada.setIdStatus(SolicitacaoStatusEnum.PAGA.getValor());
  
    solicitacaoDao.alterarStatus(solicitacaoEncontrada);
  
    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacaoEncontrada.getIdStatus(),
      null,
      null
    );

    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());
  
    return this.consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }

  public SolicitacaoDTO finalizarSolicitacao(SolicitacaoEntradaDTO solicitacaoEntradaDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoEntradaDTO.getId());
  
    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    int idFuncionario = funcionarioService.consultarPorUsuario(solicitacaoEntradaDTO.getFuncionario()); 
    FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarFuncionarioResumo(idFuncionario);
  
    solicitacaoEncontrada.setIdStatus(SolicitacaoStatusEnum.FINALIZADA.getValor());
  
    solicitacaoDao.alterarStatus(solicitacaoEncontrada);
  
    HistoricoDTO historico = new HistoricoDTO(
      LocalDateTime.now(),
      solicitacaoEncontrada.getIdStatus(),
      funcionarioEncontrado,
      null
    );

    historicoService.inserirHistorico(historico, solicitacaoEncontrada.getId());
  
    return this.consultarSolicitacaoCompleta(solicitacaoEncontrada.getId());
  }
}