<template>
  <div class="container-fluid pt-1 px-4">
    <div class="bg-dark text-light rounded p-4">
      <h1>Atendimentos Realizados</h1>
      <div class="row">
        <div class="col-md-12">
          <button 
            @click="voltar" 
            class="btn btn-danger btn-floating" 
            style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
            <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
          </button>
          <div v-for="item in atendimentosRealizados" :key="item.chave" class="card my-3">
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
                  class="btn btn-warning text-dark btn-sm me-2" 
                  @click="modificarStatus(item, 'Aguardando')">
                  Aguardando
                </button>
                <button 
                  class="btn btn-danger btn-sm me-2" 
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
      atendimentosRealizados: [],
    };
  },
  methods: {
    carregarAtendimentosRealizados() {
      const todosAtendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      this.atendimentosRealizados = todosAtendimentos.filter((item) => item.status === "Realizado");
    },
    voltar() {
      this.$router.push("/"); // Redireciona para a página inicial ao clicar no botão voltar
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
      this.carregarAtendimentosRealizados();
    },
  },
  mounted() {
    this.carregarAtendimentosRealizados();
  },
};
</script>
