import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Configuração do router mock
const routes = [
  { path: '/home', name: 'home' },
  { path: '/contato', name: 'contato' },
  { path: '/suaconta', name: 'suaconta' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Home.vue - Versão Atualizada', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
  })

  // Testes de estrutura básica
  it('renderiza a estrutura principal corretamente', () => {
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  
})