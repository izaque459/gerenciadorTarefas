const { Command } = require('commander');
const ListaTarefas = require('./ListaTarefas/ListaTarefas');

const gerenciador = new ListaTarefas();
const program = new Command();

program
  .version('1.0.0')
  .description('Gerenciador de tarefas');

program
  .command('listar')
  .description('Lista todas as tarefas')
  .action(() => { 
    gerenciador.listarTarefas();
  });

program
  .command('adicionar <descricao> <data>')
  .description('Adiciona uma nova tarefa')
  .action((descricao, data) => {
    gerenciador.adicionarTarefa(descricao, data);
  });

program
  .command('editar <id> <descricao> <data> <concluida>')
  .description('Edita uma tarefa existente')
  .action((id, descricao, data,concluida) => {
    gerenciador.atualizarTarefa(id, descricao, data, concluida);
  
  });

program
  .command('remover <id>')
  .description('Remove uma tarefa existente')
  .action((id) => {
    gerenciador.removerTarefa(id);
  });

program.parse(process.argv);
