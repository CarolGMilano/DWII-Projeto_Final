package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Manutencao;
import br.net.dwii.projeto.manutencao.model.dao.ManutencaoDao;
import br.net.dwii.projeto.manutencao.model.dto.ManutencaoDTO;

@Service
public class ManutencaoService {
  @Autowired
  private ManutencaoDao manutencaoDao;

  public ManutencaoDTO inserirManutencao(ManutencaoDTO manutencaoDTO, int idSolicitacao) throws Exception {
    Manutencao manutencao = new Manutencao(
      -1, 
      idSolicitacao, 
      manutencaoDTO.getDescricao(), 
      manutencaoDTO.getOrientacao()
    );

    manutencaoDao.inserir(manutencao);

    return this.consultarManutencao(idSolicitacao);
  }

  public ManutencaoDTO consultarManutencao(int idSolicitacao) throws Exception {
    Manutencao manutencaoEncontrada = manutencaoDao.consultar(idSolicitacao);

    if (manutencaoEncontrada == null) {
      return null;
    }

    return new ManutencaoDTO(
      manutencaoEncontrada.getDescricao(), 
      manutencaoEncontrada.getOrientacao()
    );
  }
}
