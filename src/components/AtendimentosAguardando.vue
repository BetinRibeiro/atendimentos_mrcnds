<template>
  <div class="container-fluid pt-1 px-4">
    <div class="bg-dark text-light rounded p-4">
      <h1>Atendimentos Aguardando</h1>
      <div class="row">
        <div class="col-md-12">
          <button 
            @click="voltar" 
            class="btn btn-danger btn-floating" 
            style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
            <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
          </button>
          <div v-for="item in atendimentosAguardando" :key="item.chave" class="card my-3">
            <div class="card-header">
              <h5>{{ item.nome }} - {{ item.telefone }}</h5>
            </div>
            <div class="card-body">
              <p><strong>Cidade:</strong> {{ item.cidade }}</p>
              <p><strong>Valor:</strong> {{ formatarValor(item.valor) }}</p>
              <p><strong>Dia:</strong> {{ item.dia_mes }}</p>
              <p><strong>Rota:</strong> {{ item.rota }}</p>
              <p><strong>Status:</strong> {{ item.status }}</p>
              <div class="d-flex justify-content-end">
                <button 
                  class="btn btn-success btn-sm me-2" 
                  @click="modificarStatus(item, 'Realizado')">
                  Finalizar
                </button>
                <button 
                  class="btn btn-danger btn-sm" 
                  @click="modificarStatus(item, 'Cancelado')">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Botão Flutuante -->
  <router-link to="/cadastrar">
    <button class="btn btn-success rounded-circle p-4 position-fixed bottom-0 end-0 m-4">
      <i class="fa fa-plus fa-2x"></i>
    </button>
  </router-link>
</template>

<script>
export default {
  data() {
    return {
      atendimentosAguardando: [],
    };
  },
  methods: {
    carregarAtendimentosAguardando() {
      const todosAtendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      this.atendimentosAguardando = todosAtendimentos.filter((item) => item.status === "Aguardando");
    },
    voltar() {
      this.$router.push("/"); // Redireciona para a página inicial ao clicar no botão voltar
    },
    ordenarAtendimentosPorDia() {
  // Ordena a lista de atendimentos pelo campo dia_mes
  this.atendimentos.sort((a, b) => {
    const diaA = parseInt(a.dia_mes, 10);
    const diaB = parseInt(b.dia_mes, 10);

    // Se diaA for menor que diaB, retorna -1, o que significa que diaA vem antes
    // Se diaA for maior que diaB, retorna 1, o que significa que diaB vem antes
    // Se forem iguais, retorna 0
    return diaA - diaB;
  });
},

    formatarValor(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    modificarStatus(item, novoStatus) {
      const todosAtendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      const index = todosAtendimentos.findIndex((atendimento) => atendimento.chave === item.chave);
      if (index !== -1) {
        todosAtendimentos[index].status = novoStatus;
      }
      localStorage.setItem("atendimentoCliente", JSON.stringify(todosAtendimentos));
      this.carregarAtendimentosAguardando();
    },
  },
  mounted() {
    this.carregarAtendimentosAguardando();
  },
};
</script>
