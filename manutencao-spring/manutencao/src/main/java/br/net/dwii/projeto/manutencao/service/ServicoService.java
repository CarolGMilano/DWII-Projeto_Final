package br.net.dwii.projeto.manutencao.service;

import java.util.ArrayList;
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

  public void inserirServico(ServicoDTO servicoDTO, int idOrcamento) throws Exception{
    Servico servico = new Servico(
      -1, 
      idOrcamento, 
      servicoDTO.getDescricao(), 
      servicoDTO.getPreco()
    );

    servicoDao.inserir(servico);
  }

  public List<ServicoDTO> listarServicos(int idOrcamento) throws Exception {
    List<ServicoDTO> servicos = new ArrayList<>();

    for(Servico servico : servicoDao.listar(idOrcamento)){
      servicos.add(
        new ServicoDTO (
          servico.getDescricao(),
          servico.getPreco()
        )
      );
    }

    return servicos;
  }
}
