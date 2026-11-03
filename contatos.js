const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');

function mostrarContatos() {
  const contatos = Contatos.listar()
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  lista.innerHTML = '';

  if (contatos.length === 0) {
    mensagem.textContent = 'Nenhum contato cadastrado.';
    return;
  }

  mensagem.textContent = '';

  contatos.forEach((c) => {
    const li = document.createElement('li');

    const nome = document.createElement('span');
    nome.className = 'nome';
    nome.textContent = c.nome;

    const tel = document.createElement('a');
    tel.href = `tel:${c.telefone}`;
    tel.textContent = c.telefone;

    li.append(nome, tel);
    lista.appendChild(li);
  });
}

mostrarContatos();
