

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
async adicionar(descricao, data) {
    const query = {
      text: 'INSERT INTO tarefas(descricao, vencimento) VALUES($1, $2)',
      values: [descricao, data]
    };
  
    try {
      const result = await this.cliente.query(query);
      return result;
    } catch (err) {
      console.error('Erro ao adicionar tarefa', err);
      return null;
    }
  }
  

  async atualizar(id,descricao,data,concluida) {
    const query = {
      text: 'UPDATE tarefas SET descricao = $2, vencimento = $3, conclusao = $4 WHERE id = $1',
      values: [id, descricao, data,concluida]
    };

    try {
      const result = await this.cliente.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao atualizar tarefa', err);
      return null;
    }
  }

  async remover(id) {
    const query = {
      text: 'DELETE FROM tarefas WHERE id = $1',
      values: [id]
    };

    try {
      const result = await this.cliente.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao remover tarefa', err);
      return null;
    }
  }

  async buscar(id) {
    const query = {
      text: 'SELECT * FROM tarefas WHERE id = $1',
      values: [id]
    };

    try {
      const result = await this.cliente.query(query);
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao buscar tarefa', err);
      return null;
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
