<template>
    <div class="container text-left">
      <h1>Local Storage Viewer - Itens Específicos</h1>
      
      <!-- Botões para exportar e importar -->
      <button @click="exportarDados" class="btn">Exportar Dados</button>
      <input type="file" @change="importarDados" class="btn" />
      
      <div v-if="filteredEntries.length > 0">
        <div v-for="(entry, index) in filteredEntries" :key="index" class="json-block">
          <h3>{{ entry.key }}</h3>
          <pre>{{ entry.value }}</pre>
        </div>
      </div>
      <div v-else>
        <p>Nenhum dado específico encontrado no LocalStorage.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filteredEntries: []
      };
    },
    methods: {
      loadSpecificLocalStorageData() {
        const specificKeys = ['atendimentoCliente'];
        const entries = [];
  
        specificKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              // Tenta converter para JSON se for um objeto
              entries.push({ key, value: JSON.stringify(JSON.parse(value), null, 2) });
            } catch (e) {
              // Caso não seja JSON, mantém como string
              entries.push({ key, value });
            }
          }
        });
  
        this.filteredEntries = entries;
      },
  
      // Função para exportar os dados específicos do localStorage
      exportarDados() {
        const specificKeys = ['atendimentoCliente'];
        let dataToExport = {};
  
        specificKeys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value) {
            try {
              dataToExport[key] = JSON.parse(value); // Parse JSON caso seja um objeto
            } catch (e) {
              dataToExport[key] = value; // Manter string se não for JSON
            }
          }
        });
  
        const dados = JSON.stringify(dataToExport, null, 2); // JSON formatado
        const blob = new Blob([dados], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const dataFormatada = new Date()
          .toLocaleDateString("pt-BR")
          .replace(/\//g, "-");
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup_${dataFormatada}.json`; // Nome do arquivo
        a.click();
      },
  
      // Função para importar dados e salvar no localStorage
      importarDados(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const importedData = JSON.parse(e.target.result);
  
              // Verificar se os dados importados contêm as chaves específicas
              const specificKeys = ['atendimentoCliente'];
  
              specificKeys.forEach((key) => {
                if (importedData[key]) {
                  // Salvar os dados importados no localStorage
                  localStorage.setItem(key, JSON.stringify(importedData[key]));
                }
              });
  
              // Recarregar a exibição dos dados após a importação
              this.loadSpecificLocalStorageData();
  
            } catch (error) {
              console.error("Erro ao importar o arquivo:", error);
            }
          };
          reader.readAsText(file);
        }
      }
    },
    mounted() {
      this.loadSpecificLocalStorageData();
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  
  .btn {
    margin-right: 10px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  
  .json-block {
    background-color: #f8f9fa;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    word-wrap: break-word;
  }
  
  pre {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;  /* Adiciona alinhamento à esquerda */
  }
  </style>
  