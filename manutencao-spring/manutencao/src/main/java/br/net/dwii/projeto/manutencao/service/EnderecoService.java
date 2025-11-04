package br.net.dwii.projeto.manutencao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.net.dwii.projeto.manutencao.model.Endereco;
import br.net.dwii.projeto.manutencao.model.dao.EnderecoDao;

@Service
public class EnderecoService {
  //Consigo fazer a injeção automatica, pois ele é um @Repository
  @Autowired
  private EnderecoDao enderecoDao;

  private void validarEndereco(Endereco endereco) throws Exception {
    if (endereco.getCep() == null || endereco.getCep().isBlank()) {
      throw new Exception("CEP é obrigatório");
    } else if (!endereco.getCep().matches("\\d+")) {
      throw new Exception("O CEP deve conter apenas números");
    }

    if (endereco.getLogradouro() == null || endereco.getLogradouro().isBlank()) {
      throw new Exception("Logradouro é obrigatório");
    } 

    if (endereco.getBairro() == null || endereco.getBairro().isBlank()) {
      throw new Exception("Bairro é obrigatório");
    } 

    if (endereco.getCidade() == null || endereco.getCidade().isBlank()) {
      throw new Exception("Cidade é obrigatória");
    } 

    if (endereco.getEstado() == null || endereco.getEstado().isBlank()) {
      throw new Exception("Estado é obrigatório");
    } 
  }

  public void inserirEndereco(Endereco endereco) throws Exception {
    validarEndereco(endereco);

    enderecoDao.inserir(endereco);
  }

  public Endereco consultarEndereco(int idCliente) throws Exception {
    return enderecoDao.consultar(idCliente);
  }
}