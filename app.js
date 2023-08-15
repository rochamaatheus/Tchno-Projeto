const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: 'Item Adicionado!',
    alertaAtivo: false,
    carrinhoAtivo: false,
  },
  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
    produto() {
      document.title = this.produto.nome || 'Techno';
      const hash = this.produto.id || '';
      history.pushState(null, null, `#${hash}`);
    },
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => (total += item.preco));
      }
      return total;
    },
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  },
  methods: {
    fetchListaProdutos() {
      fetch('./api/produtos.json')
        .then((r) => r.json())
        .then((json) => (this.produtos = json));
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((r) => r.json())
        .then((json) => (this.produto = json));
    },
    clickForaCarrinho(event) {
      if (event.target === event.currentTarget) this.carrinhoAtivo = false;
    },
    fecharModal(event) {
      if (event.target === event.currentTarget) this.produto = false;
    },
    abrirModal(id) {
      this.fetchProduto(id);
    },
    adicionarItem() {
      this.produto.estoque--;
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
      this.alerta(`${nome} foi adicionado ao carrinho.`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarCarrinho() {
      if (window.localStorage.carrinho)
        this.carrinho = JSON.parse(window.localStorage.carrinho);
    },
    alerta(mensagem) {
      let alertTimeout;
      clearTimeout(alertTimeout);
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;
      alertTimeout = setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    router() {
      const hash = document.location.hash;
      if (hash) this.fetchProduto(hash.replace('#', ''));
    },
  },
  created() {
    this.fetchListaProdutos();
    this.checarCarrinho();
    this.router();
  },
});
