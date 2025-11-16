package br.net.dwii.projeto.manutencao.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Historico;
import br.net.dwii.projeto.manutencao.model.dao.HistoricoDao;
import br.net.dwii.projeto.manutencao.model.dto.FuncionarioResumoDTO;
import br.net.dwii.projeto.manutencao.model.dto.HistoricoDTO;

@Service
public class HistoricoService {
  @Autowired
  private HistoricoDao historicoDao;

  @Autowired
  private FuncionarioService funcionarioService;

  public void inserirHistorico(HistoricoDTO historicoDTO, int idSolicitacao) throws Exception {
    Integer idFuncionario = null;
    Integer idFuncionarioDestino = null;

    if (historicoDTO.getFuncionario() != null) {
      idFuncionario = historicoDTO.getFuncionario().getId();
    }

    if (historicoDTO.getFuncionarioDestino() != null) {
      idFuncionarioDestino = historicoDTO.getFuncionarioDestino().getId();
    }

    Historico historico = new Historico(
      -1,
      idSolicitacao,
      Timestamp.valueOf(historicoDTO.getDataHora()),
      historicoDTO.getStatus(),
      idFuncionario,
      idFuncionarioDestino,
      historicoDTO.getMsgRejeicao()
    );

    historicoDao.inserir(historico);
  }

  public List<HistoricoDTO> listarHistorico(int idSolicitacao) throws Exception {
    List<HistoricoDTO> historicos = new ArrayList<>();

    for (Historico historico : historicoDao.listar(idSolicitacao)) {
      FuncionarioResumoDTO funcionario = null;
      FuncionarioResumoDTO funcionarioDestino = null;

      if (historico.getIdFuncionario() != null && historico.getIdFuncionario() > 0) {
        funcionario = funcionarioService.consultarFuncionarioResumo(historico.getIdFuncionario());
      }

      if (historico.getIdFuncionarioDestino() != null && historico.getIdFuncionarioDestino() > 0) {
        funcionarioDestino = funcionarioService.consultarFuncionarioResumo(historico.getIdFuncionarioDestino());
      }

      historicos.add(
        new HistoricoDTO(
          historico.getDataHora().toLocalDateTime(),
          historico.getIdStatus(),
          funcionario,
          funcionarioDestino,
          historico.getMsgRejeicao()
        )
      );
    }

    return historicos;
  }
}
