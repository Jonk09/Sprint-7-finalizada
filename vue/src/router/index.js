import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue'

import alertas from '../components/alertas.vue';
 import bemvindo from '../components/bemvindo.vue';  
import cadastro from '../components/cadastro.vue'; 
import conexao from '../components/conexao.vue'; 
import contato from '../components/contato.vue'; import decisoes from '../components/decisoes.vue'; 
import escalabilidade from '../components/escalabilidade.vue'; 
import estoque from '../components/estoque.vue'; 
import home from '../components/home.vue'; 
import integracao from '../components/integracao.vue'; 
import reducao from '../components/reducao.vue'; 
import sobre from '../components/sobre.vue'; 
import suaconta from '../components/suaconta.vue'; 


const routes = [
    { path: '/', name: 'login', component: login },
    {path: '/alertas', name: 'alertas', component: alertas }, 
    {path: '/bemvindo', name: 'bemvindo', component: bemvindo}, 
    {path: '/cadastro', name: 'cadastro', component:cadastro },
    {path: '/conexao', name: 'conexao', component: conexao},
    {path: '/contato', name: 'decisões', component: contato},
    {path: '/decisoes', name: 'decisoes', component: decisoes},
    {path: '/escalabilidade', name: 'escalabilidade', component: escalabilidade},
    {path: '/estoque', name: 'estoque', component: estoque},
    {path: '/home', name: 'home', component: home},
    {path: '/integracao', name: 'integracao', component: integracao},
    {path: '/reducao', name: 'reducao', component: reducao},
    {path: '/sobre', name: 'sobre', component: sobre},
    {path: '/suaconta', name: 'suaconta', component: suaconta},


    // { path: '/about', name: 'about', component: About },
];


export const router = createRouter({
    history: createWebHistory(),
    routes
});