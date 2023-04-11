

const pg = require('pg');

const config = {
    user: 'usuariobanco',
    host: 'localhost',
    database: 'DatabaseTarefas',
    password: '789A$ek',
    port: 5432
  };
  
  

class TarefaDAO {
  constructor() {
    
    this.cliente = new pg.Client(config);

    this.cliente.connect();
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
    const query = {
      text: 'DELETE FROM tarefas WHERE id = $1',
      values: [id]
    };

    try {
      const result = await this.client.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao remover tarefa', err);
      return null;
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
    const query = {
      text: 'SELECT * FROM tarefas ORDER BY vencimento ASC'
    };

    try {
      const result = await this.cliente.query(query);
      return result.rows;
    } catch (err) {
      console.error('Erro ao listar tarefas', err);
      return null;
    }
  }
}

module.exports = TarefaDAO;
