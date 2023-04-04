CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  vencimento TIMESTAMP NOT NULL,
  conclusao BOOLEAN NOT NULL DEFAULT false
);
