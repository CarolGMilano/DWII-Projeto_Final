-- Organização do banco de dados
DROP DATABASE IF EXISTS manutencao_db;
CREATE DATABASE manutencao_db;
USE manutencao_db;

-- Enums
CREATE TABLE tipoUsuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL
);

CREATE TABLE statusSolicitacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL
);

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(150) NOT NULL,
  salt VARCHAR(150) NOT NULL,
  idTipo INT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (idTipo) REFERENCES tipoUsuario(id)
);

CREATE TABLE cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  telefone VARCHAR(11) NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE funcionario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idUsuario INT NOT NULL,
  dataNascimento DATE NOT NULL,
  FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);

CREATE TABLE endereco (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idCliente INT NOT NULL,
  cep VARCHAR(8) NOT NULL,
  logradouro VARCHAR(200) NOT NULL,
  numero INT,
  bairro VARCHAR(150) NOT NULL,
  cidade VARCHAR(200) NOT NULL,
  estado VARCHAR(200) NOT NULL,
  FOREIGN KEY (idCliente) REFERENCES cliente(id)
);

CREATE TABLE categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(150) NOT NULL
);
  
CREATE TABLE solicitacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  equipamento VARCHAR(255) NOT NULL,
  idCategoria INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  idStatus INT NOT NULL, 
  idFuncionario INT NOT NULL,
  idCliente INT NOT NULL,
  FOREIGN KEY (idCategoria) REFERENCES categoria(id),
  FOREIGN KEY (idStatus) REFERENCES statusSolicitacao(id),
  FOREIGN KEY (idCliente) REFERENCES cliente(id),
  FOREIGN KEY (idFuncionario) REFERENCES funcionario(id)
);

CREATE TABLE manutencao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idSolicitacao INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  orientacao VARCHAR(255) NOT NULL,
  FOREIGN KEY (idSolicitacao) REFERENCES solicitacao(id)
);

CREATE TABLE historico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idSolicitacao INT NOT NULL,
  dataHora DATETIME NOT NULL,
  idStatus INT NOT NULL,
  idFuncionario INT NOT NULL,
  idFuncionarioDestino INT,
  observacao VARCHAR(255) NOT NULL,
  FOREIGN KEY (idSolicitacao) REFERENCES solicitacao(id), 
  FOREIGN KEY (idStatus) REFERENCES statusSolicitacao(id), 
  FOREIGN KEY (idFuncionario) REFERENCES funcionario(id),
  FOREIGN KEY (idFuncionarioDestino) REFERENCES funcionario(id)
);

CREATE TABLE orcamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idSolicitacao INT NOT NULL,
  valorTotal NUMERIC(10,2) NOT NULL,
  aprovada BOOLEAN DEFAULT NULL,
  msgRejeicao VARCHAR(255),
  FOREIGN KEY (idSolicitacao) REFERENCES solicitacao(id)
);

CREATE TABLE servico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idOrcamento INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  FOREIGN KEY (idOrcamento) REFERENCES orcamento(id)
);

INSERT INTO tipoUsuario (id, descricao) VALUES 
(1, 'Cliente'),
(2, 'Funcionário');

INSERT INTO statusSolicitacao (id, descricao) VALUES
(1, 'Aberta'),
(2, 'Orçada'),
(3, 'Aprovada'),
(4, 'Rejeitada'),
(5, 'Redirecionada'),
(6, 'Arrumada'),
(7, 'Paga'),
(8, 'Finalizada');