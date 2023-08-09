const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
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
  },
  created() {
    this.fetchListaProdutos();
  },
});
