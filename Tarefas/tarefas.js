class Tarefa {
  constructor(id, descricao, data, status) {
    this.id = id;
    this.descricao = descricao;
    this.data = data;
    this.status = status;
  }

  getId() {
    return this.id;
  }

  getDescricao() {
    return this.descricao;
  }

  setDescricao(descricao) {
    this.descricao = descricao;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }
}

module.exports = Tarefa;
