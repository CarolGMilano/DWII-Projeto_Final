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

  private void validarEndereco(Endereco endereco) {
    if (endereco.getCep() == null || endereco.getCep().isBlank()) {
      throw new IllegalArgumentException("CEP é obrigatório");
    } else if (!endereco.getCep().matches("\\d+")) {
      throw new IllegalArgumentException("O CEP deve conter apenas números");
    }

    if (endereco.getLogradouro() == null || endereco.getLogradouro().isBlank()) {
      throw new IllegalArgumentException("Logradouro é obrigatório");
    } 

    if (endereco.getBairro() == null || endereco.getBairro().isBlank()) {
      throw new IllegalArgumentException("Bairro é obrigatório");
    } 

    if (endereco.getCidade() == null || endereco.getCidade().isBlank()) {
      throw new IllegalArgumentException("Cidade é obrigatória");
    } 

    if (endereco.getEstado() == null || endereco.getEstado().isBlank()) {
      throw new IllegalArgumentException("Estado é obrigatório");
    } 
  }

  public void inserirEndereco(Endereco endereco) throws Exception {
    validarEndereco(endereco);

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