<template>
    <div>
  
      <!-- Formulário de Cadastro -->
      <div class="row">

      <!-- Botão flutuante Voltar -->
        <div class="col-md-6 offset-md-3">
      <button 
        @click="voltar" 
        class="btn btn-danger btn-floating" 
        style="position: fixed; top: 10px; left: 10px; z-index: 1000;">
        <i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
      </button>
          <div class="card">
            <div class="card-header">
              <h2>Formulário de Cadastro</h2>
            </div>
            <div class="card-body">
              <form @submit.prevent="adicionarAtendimento">
                <div>
                  <label class="form-label mt-2">Nome</label>
                  <input class="form-control" v-model="nome" placeholder="Nome do Cliente" required />
                </div>
                <div>
                  <label class="form-label mt-2">Telefone</label>
                  <input 
                  class="form-control" 
                  v-model="telefone" 
                  @input="formatarTelefone" 
                  placeholder="(00) 00000-0000" 
                  maxlength="15" 
                  required />
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
                <button class="form-control mt-4 bg-success text-white" type="submit">
                  Cadastrar Atendimento
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      };
    },
    methods: {
      gerarChavePrimaria() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      },
    // Função para aplicar a máscara no telefone
    formatarTelefone() {
      let telefone = this.telefone.replace(/\D/g, ""); // Remove caracteres não numéricos
      if (telefone.length > 10) {
        telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (telefone.length > 5) {
        telefone = telefone.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (telefone.length > 2) {
        telefone = telefone.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else {
        telefone = telefone.replace(/^(\d*)/, "($1");
      }
      this.telefone = telefone;
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
        this.$router.push("/"); // Redireciona para a página inicial
      },
      salvarAtendimento(item) {
        let atendimentos = JSON.parse(localStorage.getItem("atendimentoCliente")) || [];
        atendimentos.push(item);
        localStorage.setItem("atendimentoCliente", JSON.stringify(atendimentos));
      },
      limparFormulario() {
        this.nome = this.telefone = this.endereco = this.cidade = this.valor = this.dia_mes = this.rota = "";
        this.status = "Aguardando";
      },
      voltar() {
        this.$router.push("/"); // Redireciona para a página inicial ao clicar no botão voltar
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilo para o botão flutuante */
  .btn-floating {
    border-radius: 50%;
    padding: 10px 15px;
    font-size: 18px;
  }
  
  .bi-arrow-left {
    font-size: 20px;
  }
  </style>
  