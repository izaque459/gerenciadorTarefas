const TarefaDAO = require ('../Tarefas/TarefaDAO');
const Tarefa = require('../Tarefas/Tarefa');

class ListaTarefas {
  constructor() {
    this.TarefaDAO = new TarefaDAO(); // instancia um objeto TarefaDAO
    this.tarefas = []; // cria uma lista vazia de tarefas
  }

  adicionarTarefa(descricao, data) {
    this.TarefaDAO.adicionar(descricao, data)
        .then(() => {
            console.log('Tarefa adicionada com sucesso!');
            process.exit();
        })
        .catch((error) => {
            console.error('Erro ao adicionar tarefa: ', error);
            process.exit();
        });
}

  atualizarTarefa(id,descricao,data,concluida) {
    this.TarefaDAO.atualizar(id,descricao,data,concluida) // atualiza a tarefa no banco de dados
      .then(() => {
        console.log('Tarefa da lista atualizada com sucesso!');
        process.exit();
      })
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  }

  removerTarefa(id) {
    this.TarefaDAO.remover(id) // remove a tarefa do banco de dados
      .then(() => {
        const index = this.tarefas.findIndex((tarefa) => tarefa.id === id);
        if (index !== -1) {
          this.tarefas.splice(index, 1); // remove a tarefa da lista de tarefas
          console.log('Tarefa removida da lista com sucesso!');
        }
        process.exit();
      })
      .catch((error)=>{
        console.error(error);
        process.exit()
      });
  }

  listarTarefas() {
      this.TarefaDAO.listar() // recupera todas as tarefas do banco de dados
        .then((tarefas) => {
          if (tarefas) {
            this.tarefas = tarefas; // atualiza a lista de tarefas
            console.log('Lista de tarefas:');
            this.tarefas.forEach((tarefa) => console.log(tarefa));
          } else {
            console.log('Não há tarefas cadastradas');
          }
          process.exit();
        })
        .catch((error) => {
          console.error(error);
          process.exit();
        });
  }
  
}

module.exports = ListaTarefas;
