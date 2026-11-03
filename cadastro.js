//controller
const form = document.getElementById('form-contato');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', (e) => {
    e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome || !telefone) {
    mensagem.textContent = 'Nome e telefone são obrigatórios.';
    mensagem.className = 'erro';
    return;
  }

  try {
    Contatos.adicionar(nome, telefone);
    mensagem.textContent = 'Contato salvo com sucesso!';
    mensagem.className = 'sucesso';
    form.reset();
  } catch (err) {
    mensagem.textContent = 'Não foi possível salvar (armazenamento cheio ou bloqueado).';
    mensagem.className = 'erro';
  }
});
