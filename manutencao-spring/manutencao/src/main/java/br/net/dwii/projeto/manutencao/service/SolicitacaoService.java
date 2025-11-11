package br.net.dwii.projeto.manutencao.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Solicitacao;
import br.net.dwii.projeto.manutencao.model.dao.SolicitacaoDao;
import br.net.dwii.projeto.manutencao.model.dto.ClienteResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.HistoricoDTO;
import br.net.dwii.projeto.manutencao.model.dto.ManutencaoDTO;
import br.net.dwii.projeto.manutencao.model.dto.OrcamentoDTO;
import br.net.dwii.projeto.manutencao.model.dto.SolicitacaoDTO;
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

  public SolicitacaoDTO inserirSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    
    int idCliente = clienteService.consultarIdPorCPF(solicitacaoDTO.getCliente().getCpf());

    Solicitacao solicitacao = new Solicitacao(
      -1, 
      solicitacaoDTO.getEquipamento(), 
      solicitacaoDTO.getCategoria(), 
      solicitacaoDTO.getDescricao(), 
      solicitacaoDTO.getStatus(), 
      -1, 
      idCliente
    );

    validarSolicitacao(solicitacao);

    solicitacaoDao.inserir(solicitacao);

    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(historicos.size() - 1);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }

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

  public List<SolicitacaoResumoDTO> listarAbertas() throws Exception {
    List<Solicitacao> solicitacoes = solicitacaoDao.listarAbertas();
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

  public List<SolicitacaoResumoDTO> listarPorFuncionario(int idUsuario) throws Exception {
    FuncionarioResumoDTO funcionarioEncontrado = funcionarioService.consultarPorUsuario(idUsuario); 
    
    List<Solicitacao> solicitacoes = solicitacaoDao.listar(funcionarioEncontrado.getId());
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

  public SolicitacaoDTO orçarSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(), 
      solicitacaoEncontrada.getEquipamento(), 
      solicitacaoEncontrada.getIdCategoria(), 
      solicitacaoEncontrada.getDescricao(), 
      2, 
      solicitacaoDTO.getFuncionario().getId(), 
      solicitacaoEncontrada.getIdCliente()
    );

    solicitacaoDao.alterarStatus(solicitacao);
    solicitacaoDao.alterarFuncionario(solicitacao);

    orcamentoService.inserirOrcamento(solicitacaoDTO.getOrcamento(), solicitacaoEncontrada.getId());
    
    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);

      ultimoHistorico.setStatus(2);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }

    return consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO finalizarOrcamento(SolicitacaoDTO solicitacaoDTO, int status, Boolean aprovada) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(),
      solicitacaoEncontrada.getEquipamento(),
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(),
      status,
      solicitacaoEncontrada.getIdFuncionario(),
      solicitacaoEncontrada.getIdCliente()
    );

    solicitacaoDao.alterarStatus(solicitacao);

    OrcamentoDTO orcamentoDTO = solicitacaoDTO.getOrcamento();
    orcamentoDTO.setAprovada(aprovada);
    orcamentoService.alterarAprovacao(orcamentoDTO, solicitacao.getId());

    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);

      ultimoHistorico.setStatus(status);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }

    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO redirecionarSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(),
      solicitacaoEncontrada.getEquipamento(),
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(),
      5,
      solicitacaoDTO.getFuncionario().getId(),
      solicitacaoEncontrada.getIdCliente()
    );

    solicitacaoDao.alterarStatus(solicitacao);
    solicitacaoDao.alterarFuncionario(solicitacao);

    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);

      ultimoHistorico.setStatus(5);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }

    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO arrumarSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());

    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }

    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(),
      solicitacaoEncontrada.getEquipamento(),
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(),
      6,
      solicitacaoEncontrada.getIdFuncionario(),
      solicitacaoEncontrada.getIdCliente()
    );

    solicitacaoDao.alterarStatus(solicitacao);

    manutencaoService.inserirManutencao(solicitacaoDTO.getManutencao(), solicitacaoEncontrada.getId());

    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();

    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);

      ultimoHistorico.setStatus(6);

      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }

    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO pagarSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());
  
    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }
  
    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(),
      solicitacaoEncontrada.getEquipamento(),
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(),
      7,
      solicitacaoEncontrada.getIdFuncionario(),
      solicitacaoEncontrada.getIdCliente()
    );
  
    solicitacaoDao.alterarStatus(solicitacao);
  
    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();
  
    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);
  
      ultimoHistorico.setStatus(7);
  
      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }
  
    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }

  public SolicitacaoDTO finalizarSolicitacao(SolicitacaoDTO solicitacaoDTO) throws Exception {
    Solicitacao solicitacaoEncontrada = solicitacaoDao.consultar(solicitacaoDTO.getId());
  
    if(solicitacaoEncontrada == null){
      throw new SolicitacaoNaoEncontradaException();
    }
  
    Solicitacao solicitacao = new Solicitacao(
      solicitacaoEncontrada.getId(),
      solicitacaoEncontrada.getEquipamento(),
      solicitacaoEncontrada.getIdCategoria(),
      solicitacaoEncontrada.getDescricao(),
      8,
      solicitacaoEncontrada.getIdFuncionario(),
      solicitacaoEncontrada.getIdCliente()
    );
  
    solicitacaoDao.alterarStatus(solicitacao);
  
    List<HistoricoDTO> historicos = solicitacaoDTO.getHistorico();
  
    if (historicos != null && !historicos.isEmpty()) {
      HistoricoDTO ultimoHistorico = historicos.get(0);
  
      ultimoHistorico.setStatus(8);
  
      historicoService.inserirHistorico(ultimoHistorico, solicitacao.getId());
    }
  
    return this.consultarSolicitacaoCompleta(solicitacao.getId());
  }
}
