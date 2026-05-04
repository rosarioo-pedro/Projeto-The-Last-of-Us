CREATE DATABASE projetoPessoal;

USE projetoPessoal;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(45),
	email VARCHAR(254),
	senha VARCHAR(16),
);

create table quiz (
	id INT PRIMARY KEY AUTO_INCREMENT,
	acertos int,
	erros INT,
	idUsuario INT,
	FOREIGN KEY (idUsuario) REFERENCES usuario (id)
);