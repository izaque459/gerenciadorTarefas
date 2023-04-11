const TarefaDAO = require ('../Tarefas/TarefaDAO');
const Tarefa = require('../Tarefas/Tarefa');

class ListaTarefas {
  constructor() {
    this.TarefaDAO = new TarefaDAO(); // instancia um objeto TarefaDAO
    this.tarefas = []; // cria uma lista vazia de tarefas
  }

  adicionarTarefa(descricao, data) {
    const tarefa = new Tarefa(descricao, data); // cria um novo objeto Tarefa
    this.TarefaDAO.adicionar(tarefa) // persiste a tarefa no banco de dados
      .then(() => {
        this.tarefas.push(tarefa); // adiciona a tarefa na lista de tarefas
        console.log('Tarefa adicionada a lista com sucesso!');
      })
      .catch((error) => console.error(error));
  }

  atualizarTarefa(tarefa) {
    this.TarefaDAO.atualizar(tarefa) // atualiza a tarefa no banco de dados
      .then(() => console.log('Tarefa da lista atualizada com sucesso!'))
      .catch((error) => console.error(error));
  }

  removerTarefa(tarefa) {
    this.TarefaDAO.remover(tarefa) // remove a tarefa do banco de dados
      .then(() => {
        const index = this.tarefas.indexOf(tarefa);
        if (index !== -1) {
          this.tarefas.splice(index, 1); // remove a tarefa da lista de tarefas
          console.log('Tarefa removida da lista com sucesso!');
        }
      })
      .catch((error) => console.error(error));
  }

  listarTarefas() {
      this.TarefaDAO.listar() // recupera todas as tarefas do banco de dados
        .then((tarefas) => {
          if (tarefas.rowCount > 0) {
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
