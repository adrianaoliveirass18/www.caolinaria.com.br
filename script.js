// ROLAGEM SUAVE
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

// INTERAÇÃO EXTRAS FUTURAS: adicionar alertas, produtos ao carrinho, etc.
// Exemplo: Ao clicar em qualquer item, mostra um alerta fofo
document.querySelectorAll("ul li").forEach((item) => {
  item.addEventListener("click", () => {
    alert(`🐶 O petisco "${item.textContent}" foi selecionado!`);
  });
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const destino = document.getElementById(targetId);
    if (destino) {
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    // ✅ Verifique se o destino existe
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Elemento com id "${targetId}" não encontrado.`);
    }
  });
});
<script>
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
<script>
  // 1) Array que guarda os itens no carrinho
  let carrinho = [];

  // 2) Função para adicionar ao carrinho
  function addToCart(produto) {
    const existente = carrinho.find(item => item.nome === produto);
    if (existente) {
      existente.qtd += 1;
    } else {
      carrinho.push({ nome: produto, qtd: 1 });
    }
    updateContador();
  }

  // 3) Atualiza o número no ícone (span#contador) e, se o pop-up estiver aberto, atualiza a lista lá também
  function updateContador() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.qtd, 0);
    document.getElementById('contador').innerText = totalItens;
    if (!document.getElementById('popupCarrinho').classList.contains('hidden')) {
      mostrarCarrinho();
    }
  }

  // 4) Mostra o conteúdo do carrinho dentro do pop-up
  function mostrarCarrinho() {
    const container = document.getElementById('itensCarrinho');
    container.innerHTML = '';

    if (carrinho.length === 0) {
      container.innerHTML = "<p class='text-gray-500'>Carrinho vazio 🐾</p>";
      return;
    }

    carrinho.forEach((item, idx) => {
      container.innerHTML += `
        <div class="flex justify-between items-center border-b pb-2">
          <div>
            <strong>${item.nome}</strong><br>
            <small>Quantidade: ${item.qtd}</small>
          </div>
          <div class="flex gap-2">
            <button onclick="mudarQtd(${idx}, -1)" class="px-2 bg-gray-200 rounded">−</button>
            <button onclick="mudarQtd(${idx}, 1)" class="px-2 bg-gray-200 rounded">+</button>
            <button onclick="removerItem(${idx})" class="px-2 bg-red-500 text-white rounded">🗑</button>
          </div>
        </div>
      `;
    });
  }

  // 5) Incrementa ou decrementa a quantidade de um item
  function mudarQtd(index, delta) {
    carrinho[index].qtd += delta;
    if (carrinho[index].qtd <= 0) {
      carrinho.splice(index, 1);
    }
    updateContador();
    mostrarCarrinho();
  }

  // 6) Remove o item inteiro
  function removerItem(index) {
    carrinho.splice(index, 1);
    updateContador();
    mostrarCarrinho();
  }

  // 7) Abre o pop-up do carrinho
  function abrirCarrinho() {
    mostrarCarrinho();
    document.getElementById('popupCarrinho').classList.remove('hidden');
  }

  // 8) Fecha o pop-up do carrinho
  function fecharCarrinho() {
    document.getElementById('popupCarrinho').classList.add('hidden');
  }

  // 9) Alterna entre mostrar/esconder o carrinho (ícone)
  function toggleCart() {
    const popup = document.getElementById('popupCarrinho');
    if (popup.classList.contains('hidden')) {
      abrirCarrinho();
    } else {
      fecharCarrinho();
    }
  }

  // 10) Envia o pedido via WhatsApp
  function sendToWhatsApp() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const numero = '5581999999999'; // substitua pelo seu DDI+DDD sem símbolos
    let mensagem = 'Olá! Gostaria de fazer um pedido:\n\n';
    carrinho.forEach((item, idx) => {
      mensagem += `${idx + 1}. ${item.nome} (x${item.qtd})\n`;
    });
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  }
</script>
