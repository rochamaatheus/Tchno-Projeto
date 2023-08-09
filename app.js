const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
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
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
  },
  created() {
    this.fetchListaProdutos();
  },
});
