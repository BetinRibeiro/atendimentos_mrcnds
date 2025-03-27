<template>
  <button @click="popularAtendimentos" class="btn btn-primary">Gerar Atendimentos</button>
  <button @click="deletarTodosAtendimentos" class="btn btn-primary">Deleta Tudo Atendimentos</button>
  <div class="container-fluid pt-1 px-4">
    <div class="bg-dark rounded p-4">
      <h1>Atendimentos</h1>
      <div class="row">
        <div class="col-md-12" v-if="!mostrandoFormulario">
      <button 
        @click="voltar" 
        class="btn btn-danger btn-floating" 
        style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
        <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
      </button>
          <div class="card">
            <div class="card-header text-right">
              <h2> ({{ atendimentos.length }})</h2>
              <button class="btn btn-success" @click="mostrarFormulario(true)">Novo Atendimento</button>
            </div>
            <div class="card-body">
              <div class="row">
  <div class="col-md-4 mb-3" v-for="item in atendimentos" :key="item.chave">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ item.nome }}</h5>
        <p class="card-text"><strong>Telefone:</strong> {{ item.telefone }}</p>
        <p class="card-text"><strong>Cidade:</strong> {{ item.cidade }}</p>
        <p class="card-text"><strong>Valor:</strong> {{ formatarValor(item.valor) }}</p>
        <p class="card-text"><strong>Dia:</strong> {{ item.dia_mes }}</p>
        <p class="card-text"><strong>Rota:</strong> {{ item.rota }}</p>
        <p class="card-text"><strong>Status:</strong> {{ item.status }}</p>
        <div id="noprint">
          <button class="btn btn-warning btn-sm" @click="editarAtendimento(item)">Editar</button>
          <button class="btn btn-danger btn-sm" @click="excluirAtendimento(item.chave)">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>

        <div class="col-md-6 offset-md-3" v-if="mostrandoFormulario">
          <div class="card">
            <div class="card-header">
              <h2>{{ itemEditando ? "Editar Atendimento" : "Novo Atendimento" }}</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="itemEditando ? atualizarAtendimento() : adicionarAtendimento()">
                <div>
                  <label class="form-label mt-2">Nome</label>
                  <input class="form-control" v-model="nome" placeholder="Nome do Cliente" required />
                </div>
                <div>
                  <label class="form-label mt-2">Telefone</label>
                  <input class="form-control" v-model="telefone" placeholder="Telefone" required />
                </div>
                <div>
                  <label class="form-label mt-2">Endereço</label>
                  <input class="form-control" v-model="endereco" placeholder="Endereço" required />
                </div>
                <div>
                  <label class="form-label mt-2">Cidade</label>
                  <input class="form-control" v-model="cidade" placeholder="Cidade" required />
                </div>
                <div>
                  <label class="form-label mt-2">Valor</label>
                  <input class="form-control" v-model="valor" type="number" step="0.01" placeholder="Valor" required />
                </div>
                <div>
                  <label class="form-label mt-2">Dia do Mês</label>
                  <input class="form-control" v-model.number="dia_mes" type="number" min="1" max="31" required />
                </div>
                <div>
                  <label class="form-label mt-2">Rota</label>
                  <input class="form-control" v-model="rota" placeholder="Rota" required />
                </div>
                <div>
                  <label class="form-label mt-2">Status</label>
                  <select class="form-control" v-model="status" required>
                    <option value="Aguardando">Aguardando</option>
                    <option value="Realizado">Realizado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                <button class="form-control mt-4 bg-primary text-white" type="submit">
                  {{ itemEditando ? "Atualizar Atendimento" : "Adicionar Atendimento" }}
                </button>
                <button class="form-control mt-2 bg-secondary text-white" @click="mostrarFormulario(false)">Cancelar</button>
              </form>
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
      nome: "",
      telefone: "",
      endereco: "",
      cidade: "",
      valor: "",
      dia_mes: "",
      rota: "",
      status: "Aguardando",
      atendimentos: [],
      itemEditando: null,
      mostrandoFormulario: false,
    };
  },
  methods: {
    gerarChavePrimaria() {
      return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    },
    deletarTodosAtendimentos() {
  localStorage.removeItem("atendimentoCliente"); // Remove todos os atendimentos armazenados
  this.carregarAtendimentos(); // Atualiza a lista de atendimentos após a remoção
},
    gerarTelefoneAleatorio() {
    const ddd = Math.floor(Math.random() * (99 - 11 + 1)) + 11; // Gera um DDD aleatório entre 11 e 99
    const numero = Math.floor(Math.random() * 900000000) + 100000000; // Gera um número aleatório entre 100000000 e 999999999
    const numeroFormatado = `${ddd} ${numero.toString().slice(0, 5)}-${numero.toString().slice(5)}`; // Formata o número
    return numeroFormatado;
    },
    gerarEnderecoAleatorio() {
      return `Rua ${Math.floor(Math.random() * 80000) + 10000}`;
    },
    gerarDiaAleatorio() {
      return Math.floor(Math.random() * 30) + 1;
    },
    gerarRotaAleatoria() {
      return Math.floor(Math.random() * 15) + 1;
    },popularAtendimentos() {
  // Carrega os atendimentos existentes
  const atendimentosExistentes = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
  
  const novosAtendimentos = [];
  for (let i = 1; i <= 300; i++) {
    const numeroAleatorio = Math.floor(Math.random() * (9000000 - 1000000 + 1)) + 1000000; // Gera um número aleatório entre 1000000 e 9000000
    novosAtendimentos.push({
      chave: this.gerarChavePrimaria(),
      nome: `Cliente ${i} ${numeroAleatorio}`, // Nome do cliente concatenado com o número aleatório
      telefone: this.gerarTelefoneAleatorio(),
      endereco: this.gerarEnderecoAleatorio(),
      cidade: 'Juazeiro do Norte',
      valor: 70,
      dia_mes: this.gerarDiaAleatorio(),
      rota: this.gerarRotaAleatoria(),
      status: 'Aguardando',
    });
  }

  // Soma a nova lista de atendimentos com a lista existente
  const atendimentosAtualizados = atendimentosExistentes.concat(novosAtendimentos);
  
  // Atualiza o localStorage com a lista combinada
  localStorage.setItem("atendimentoCliente", JSON.stringify(atendimentosAtualizados));

  // Atualiza a lista de atendimentos
  this.carregarAtendimentos(); // Chama para carregar os dados após a atualização
},


    voltar() {
      this.$router.push("/"); // Redireciona para a página inicial ao clicar no botão voltar
    },
    adicionarAtendimento() {
      const novoAtendimento = {
        chave: this.gerarChavePrimaria(),
        nome: this.nome,
        telefone: this.telefone,
        endereco: this.endereco,
        cidade: this.cidade,
        valor: parseFloat(this.valor),
        dia_mes: this.dia_mes,
        rota: this.rota,
        status: this.status,
      };
      this.salvarAtendimento(novoAtendimento);
      this.limparFormulario();
      this.mostrandoFormulario = false;
      this.carregarAtendimentos();
    },
    editarAtendimento(item) {
      Object.assign(this, item);
      this.itemEditando = item.chave;
      this.mostrandoFormulario = true;
    },
    salvarAtendimento(item) {
      let atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      atendimentos.push(item);
      localStorage.setItem("atendimentoCliente", JSON.stringify(atendimentos));
    },
    atualizarAtendimento() {
      let atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      atendimentos = atendimentos.map((item) => (item.chave === this.itemEditando ? this : item));
      localStorage.setItem("atendimentoCliente", JSON.stringify(atendimentos));
      this.itemEditando = null;
      this.limparFormulario();
      this.mostrandoFormulario = false;
      this.carregarAtendimentos();
    },
    excluirAtendimento(chave) {
      let atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      atendimentos = atendimentos.filter((item) => item.chave !== chave);
      localStorage.setItem("atendimentoCliente", JSON.stringify(atendimentos));
      this.carregarAtendimentos();
    },
    carregarAtendimentos() {
      this.atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
      // if (this.atendimentos.length === 0) {
      //   this.popularAtendimentos(); // Popula os atendimentos caso não haja dados
      // }
    },
    formatarValor(valor) {
      return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    },
    limparFormulario() {
      this.nome = this.telefone = this.endereco = this.cidade = this.valor = this.dia_mes = this.rota = "";
      this.status = "Aguardando";
    },
    mostrarFormulario(estado) {
      this.mostrandoFormulario = estado;
      if (!estado) this.limparFormulario();
    },
  },
  mounted() {
    this.carregarAtendimentos();
  },
};
</script>
