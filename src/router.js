import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import AtendimentoCliente from './components/AtendimentoCliente.vue';
import CadastrarAtendimento from './components/CadastrarAtendimento.vue';
import AtendimentosAguardando from './components/AtendimentosAguardando.vue';
import AtendimentoCancelado from './components/AtendimentoCancelado.vue';
import AtendimentoFinalizado from './components/AtendimentoFinalizado.vue';
import DadosLocal from './components/DadosLocal.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/atendimentos',
    name: 'atendimentos',
    component: AtendimentoCliente,
  },
  {
    path: '/cadastrar',
    name: 'cadastrar',
    component: CadastrarAtendimento,
  },
  {
    path: '/atendimento_aguardando',
    name: 'aguardando',
    component: AtendimentosAguardando,
  },
  {
    path: '/atendimento_finalizado',
    name: 'finalizado',
    component: AtendimentoFinalizado,
  },
  {
    path: '/atendimento_cancelado',
    name: 'cancelado',
    component: AtendimentoCancelado,
  },
  {
    path: '/dados',
    name: 'dados',
    component: DadosLocal,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
