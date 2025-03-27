<template>
    <div class="container-fluid pt-1 px-4">
      <div class="bg-dark rounded p-4">
        <h1>Atendimentos Cancelados</h1>
        <div class="row">
          <div class="col-md-12">
      <button 
        @click="voltar" 
        class="btn btn-danger btn-floating" 
        style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
        <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
      </button>
            <div class="card">
              <div class="card-header text-right">
                <h2>Atendimentos Cancelados ({{ atendimentosCancelados.length }})</h2>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Cidade</th>
                        <th>Valor</th>
                        <th>Dia</th>
                        <th>Rota</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in atendimentosCancelados" :key="item.chave">
                        <td>{{ item.nome }}</td>
                        <td>{{ item.telefone }}</td>
                        <td>{{ item.cidade }}</td>
                        <td>{{ formatarValor(item.valor) }}</td>
                        <td>{{ item.dia_mes }}</td>
                        <td>{{ item.rota }}</td>
                        <td>{{ item.status }}</td>
                      </tr>
                    </tbody>
                  </table>
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
        atendimentosCancelados: [],
      };
    },
    methods: {
      carregarAtendimentosCancelados() {
        const todosAtendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
        this.atendimentosCancelados = todosAtendimentos.filter((item) => item.status === "Cancelado");
      },
      voltar() {
        this.$router.push("/"); // Redireciona para a página inicial ao clicar no botão voltar
      },
      formatarValor(valor) {
        return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      },
    },
    mounted() {
      this.carregarAtendimentosCancelados();
    },
  };
  </script>
  
  