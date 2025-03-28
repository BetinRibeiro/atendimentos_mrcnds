<template>
  <div class="container-fluid px-1">
    <div class="bg-dark text-light rounded p-4">
      <h1>Clientes</h1>
      <p>{{ Number(storageUsedPercent).toFixed(1) }}% Memória Usada</p>

      <div class="row">
        <div class="col-sm-6 col-xl-3">
          <div class="bg-dark border rounded p-4 m-1 d-flex align-items-center justify-content-between">
            <i class="fa fa-list fa-3x text-danger"></i>
            <div class="ms-3">
              <p class="mb-2">
                <a class="mt-4" @click="$router.push('/atendimentos')">
                  Total de Atendimentos
                </a>
              </p>
              <hr />
              <h6 class="mb-0">{{ atendimentos?.length || 0 }} Total</h6>
              <h6 class="mb-0">Soma: {{ somarValorTotal(atendimentos) }}</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-dark border rounded p-4 m-1 d-flex align-items-center justify-content-between">
            <i class="fa fa-list-alt fa-3x text-danger"></i>
            <div class="ms-3">
              <p class="mb-2">
                <a class="mt-4" @click="$router.push('/atendimento_aguardando')">
                  Aguardando
                </a>
              </p>
              <hr />
              <h6 class="mb-0">{{ atendimentosAguardando?.length || 0 }} Total</h6>
              <h6 class="mb-0">Soma: {{ somarValorTotal(atendimentosAguardando) }}</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-dark border rounded p-4 m-1 d-flex align-items-center justify-content-between">
            <i class="fa fa-list-ol fa-3x text-danger"></i>
            <div class="ms-3">
              <p class="mb-2">
                <a class="mt-4" @click="$router.push('/atendimento_finalizado')">
                  Realizados
                </a>
              </p>
              <hr />
              <h6 class="mb-0">{{ atendimentosRealizados?.length || 0 }} Total</h6>
              <h6 class="mb-0">{{ somarValorTotal(atendimentosRealizados) }}</h6>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="bg-dark border rounded p-4 m-1 d-flex align-items-center justify-content-between">
            <i class="fa fa-list-ul fa-3x text-danger"></i>
            <div class="ms-3">
              <p class="mb-2">
                <a class="mt-4" @click="$router.push('/atendimento_cancelado')">
                  Cancelados
                </a>
              </p>
              <hr />
              <h6 class="mb-0">{{ atendimentosCancelados?.length || 0 }} Total</h6>
              <h6 class="mb-0">{{ somarValorTotal(atendimentosCancelados) }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Botão para alterar todos para Aguardando -->
  <button
    class="btn btn-warning mt-3"
    @click="confirmarAlterarParaAguardando"
  >
    Alterar Realizados para Aguardando
  </button>
  <button
    class="btn btn-info mt-3"
    @click="$router.push('/atendimento_cancelado')""
  >
    Salvar os Dados
  </button>
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
      atendimentos: [],
      storageMax: 5 * 1024, // 5 MB convertido para KB
      storageUsedPercent: 0,
    };
  },
  computed: {
    atendimentosAguardando() {
      return this.atendimentos.filter((a) => a.status === "Aguardando");
    },
    atendimentosRealizados() {
      return this.atendimentos.filter((a) => a.status === "Realizado");
    },
    atendimentosCancelados() {
      return this.atendimentos.filter((a) => a.status === "Cancelado");
    },
  },
  methods: {
    carregarAtendimentos() {
      this.atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      this.calcularArmazenamentoLocal(); // Recalcula o armazenamento após carregar os atendimentos
    },
    somarValorTotal(atendimentos) {
      return atendimentos?.reduce((total, item) => total + item.valor, 0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }) || "R$ 0,00"; // Fallback para quando atendimentos for vazio ou indefinido
    },
    calcularArmazenamentoLocal() {
      const used = this.getUsedStorage();
      this.storageUsedPercent = ((used / this.storageMax) * 100).toFixed(2);
    },
    getUsedStorage() {
      let used = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const itemSize = localStorage.getItem(key).length + key.length;
        used += itemSize;
      }
      return used / 1024; // Convertido para KB
    },
    confirmarAlterarParaAguardando() {
      const confirmacao = confirm(
        "Você está prestes a alterar todos os atendimentos 'Realizado' para 'Aguardando'. Isso deve ser feito apenas no final do mês, quando o ciclo for concluído. Tem certeza que deseja prosseguir?"
      );
      if (confirmacao) {
        this.alterarAtendimentosParaAguardando();
      }
    },
    alterarAtendimentosParaAguardando() {
      this.atendimentos.forEach((atendimento) => {
        if (atendimento.status === "Realizado") {
          atendimento.status = "Aguardando";
        }
      });
      localStorage.setItem("atendimentoCliente", JSON.stringify(this.atendimentos));
      this.carregarAtendimentos();
    },
    ordenarAtendimentosPorDia() {
      // Ordena a lista de atendimentos (já carregados em this.atendimentos)
      this.atendimentos.sort((a, b) => {
        const diaA = parseInt(a.dia_mes, 10);
        const diaB = parseInt(b.dia_mes, 10);
        return diaA - diaB; // Ordena em ordem crescente de dia
      });

      // Atualiza o localStorage com a lista ordenada
      localStorage.setItem("atendimentoCliente", JSON.stringify(this.atendimentos));
    },
  },
  mounted() {
    this.carregarAtendimentos();
    this.ordenarAtendimentosPorDia(); // Chama a ordenação logo após carregar os atendimentos
  },
};
</script>


<style scoped>
/* Estilo para o botão flutuante */
.btn-floating {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-size: 30px;
}
</style>
