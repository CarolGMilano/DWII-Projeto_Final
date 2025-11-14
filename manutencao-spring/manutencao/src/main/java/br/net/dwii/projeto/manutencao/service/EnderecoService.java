package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.dao.EnderecoDao;
import br.net.dwii.projeto.manutencao.model.exception.EnderecoNaoEncontradoException;

@Service
public class EnderecoService {
  //Consigo fazer a injeção automatica, pois ele é um @Repository
  @Autowired
  private EnderecoDao enderecoDao;

  public void inserirEndereco(Endereco endereco) throws Exception {
    enderecoDao.inserir(endereco);
  }

  public Endereco consultarEndereco(int idCliente) throws Exception {
    Endereco enderecoEncontrado = enderecoDao.consultar(idCliente);

    if(enderecoEncontrado == null){
      throw new EnderecoNaoEncontradoException();
    }

    return enderecoDao.consultar(idCliente);
  }
}