

const { Pool } = require('pg');

const pool = new Pool({
    user: 'usuariobanco',
    host: 'localhost',
    database: 'databaseTarefas',
    password: '789A$ek',
    port: 5432,
  });
  
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Erro ao conectar ao banco de dados', err);
    }
    console.log('Conexão estabelecida com sucesso!');
    release();
  });

class TarefaDAO {
  constructor() {
    this.pool = new Pool({
      conexao: 'postgres://user:password@localhost:5432/database',
    });
  }
//criar tarefa ou salvar
  async adicionar(tarefa) {
    const { descricao, vencimento } = tarefa;
    const cliente = await this.pool.connect();
    try {
      await cliente.query('BEGIN');
      const res = await cliente.query(
        'INSERT INTO tarefas (descricao, vencimento) VALUES ($1, $2) RETURNING id',
        [descricao, vencimento]
      );
      const id = res.rows[0].id;
      await cliente.query('COMMIT');
      return id;
    } catch (e) {
      await cliente.query('ROLLBACK');
      throw e;
    } finally {
      cliente.release();
    }
  }

  async atualizar(tarefa) {
    const { id, descricao, vencimento, conclusao } = tarefa;
    const cliente = await this.pool.connect();
    try {
      await cliente.query('BEGIN');
      await cliente.query(
        'UPDATE tarefas SET descricao=$1, vencimento=$2, conclusao=$3 WHERE id=$4',
        [descricao, vencimento, conclusao, id]
      );
      await cliente.query('COMMIT');
    } catch (e) {
      await cliente.query('ROLLBACK');
      throw e;
    } finally {
      cliente.release();
    }
  }

  async remover(id) {
    const cliente = await this.pool.connect();
    try {
      await cliente.query('BEGIN');
      await cliente.query('DELETE FROM tarefas WHERE id=$1', [id]);
      await cliente.query('COMMIT');
    } catch (e) {
      await cliente.query('ROLLBACK');
      throw e;
    } finally {
      cliente.release();
    }
  }

  async ler(id) {
    const cliente = await this.pool.connect();
    try {
      const result = await cliente.query('SELECT * FROM tarefas WHERE id=$1', [id]);
      return result.rows[0];
    } catch (e) {
      throw e;
    } finally {
      cliente.release();
    }
  }

  async listar() {
    const cliente = await this.pool.connect();
    try {
      const result = await cliente.query('SELECT * FROM tarefas ORDER BY vencimento ASC');
      return result.rows;
    } catch (e) {
      throw e;
    } finally {
      cliente.release();
    }
  }
}

module.exports = TarefaDAO;
