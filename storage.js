//model
const CHAVE = 'agenda:contatos';

const Contatos = {
  listar() {
    try {
      return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch (err) {
      return [];
    }
  },

  adicionar(nome, telefone) {
    const lista = this.listar();
    const contato = { id: Date.now(), nome, telefone };
    lista.push(contato);
    localStorage.setItem(CHAVE, JSON.stringify(lista));
    return contato;
  }
};
