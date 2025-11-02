package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.dao.EnderecoDao;
//import br.net.dwii.projeto.manutencao.model.dto.EnderecoDTO;

@Service
public class EnderecoService {
  //Consigo fazer a injeção automatica, pois ele é um @Repository
  @Autowired
  private EnderecoDao enderecoDao;

  public void adicionarEndereco(Endereco endereco) throws Exception {
    enderecoDao.adicionar(endereco);
  }

  public void consultarEndereco(int idCliente) throws Exception {
    enderecoDao.consultar(idCliente);
  }

  /* 
  public Endereco converterDTO(EnderecoDTO enderecoDTO) throws Exception {
    
  }
  */
}