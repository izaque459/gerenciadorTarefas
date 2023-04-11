const { Command } = require('commander');
const ListaTarefas = require('./ListaTarefas/ListaTarefas');

const gerenciador = new ListaTarefas();
const program = new Command();

program
  .version('1.0.0')
  .descricao('Gerenciador de tarefas');

program
  .command('listar')
  .descricao('Lista todas as tarefas')
  .action(() => {
    const tarefas = gerenciador.listarTarefas();
    console.log(tarefas);
  });

program
  .command('adicionar <descricao> <data>')
  .descricao('Adiciona uma nova tarefa')
  .action((descricao, data) => {
    gerenciador.adicionarTarefa(descricao, data);
    console.log('Tarefa adicionada com sucesso!');
  });

program
  .command('editar <id> <descricao> <data>')
  .descricao('Edita uma tarefa existente')
  .action((id, descricao, data) => {
    gerenciador.atualizarTarefa(id, descricao, data);
    console.log('Tarefa editada com sucesso!');
  });

program
  .command('remover <id>')
  .descricao('Remove uma tarefa existente')
  .action((id) => {
    gerenciador.removerTarefa(id);
    console.log('Tarefa removida com sucesso!');
  });

program.parse(process.argv);
