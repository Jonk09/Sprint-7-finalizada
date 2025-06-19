import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import { nextTick } from 'vue'

// Configuração do router mock
const routes = [
  { path: '/home', name: 'home' },
  { path: '/cadastro', name: 'cadastro' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Login.vue', () => {
  let wrapper
  const mockUsers = {
    'teste@example.com': {
      senha: 'senha123'
    }
  }

  beforeEach(() => {
    // Limpa localStorage antes de cada teste
    localStorage.clear()
    localStorage.setItem('usuarios', JSON.stringify(mockUsers))

    wrapper = mount(Login, {
      global: {
        plugins: [router]
      }
    })
  })

  it('renderiza corretamente', () => {
    expect(wrapper.find('.auth-container').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('SUPPLY AI')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('.auth-btn').text()).toBe('Entrar')
    expect(wrapper.find('.auth-link').text()).toContain('Não tem uma conta? Cadastre-se')
  })

  it('link de cadastro redireciona para a rota correta', async () => {
    const push = vi.spyOn(router, 'push')
    await wrapper.find('.auth-link').trigger('click')
    expect(push).toHaveBeenCalledWith('/cadastro')
  })

  

  it('login bem-sucedido', async () => {
    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.vm.mensagem.texto).toBe('Login bem-sucedido! Redirecionando...')
    expect(wrapper.vm.mensagem.erro).toBe(false)
    expect(localStorage.getItem('usuarioLogado')).toBe('teste@example.com')
  })

  it('login falho - email incorreto', async () => {
    await wrapper.find('input[type="email"]').setValue('inexistente@example.com')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    await nextTick() // Aguarda atualização do DOM

    expect(wrapper.vm.mensagem.texto).toBe('Email ou senha incorretos')
    expect(wrapper.vm.mensagem.erro).toBe(true)
    expect(localStorage.getItem('usuarioLogado')).toBeNull()
    expect(wrapper.find('.mensagem.erro').exists()).toBe(true)
  })

  it('login falho - senha incorreta', async () => {
    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senhaerrada')
    await wrapper.find('form').trigger('submit')

    await nextTick()

    expect(wrapper.vm.mensagem.texto).toBe('Email ou senha incorretos')
    expect(wrapper.vm.mensagem.erro).toBe(true)
    expect(localStorage.getItem('usuarioLogado')).toBeNull()
  })

  it('normaliza email (trim e lowercase)', async () => {
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { senha: 'senha123' }
    }))

    await wrapper.find('input[type="email"]').setValue('  TESTE@example.COM  ')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.mensagem.texto).toBe('Login bem-sucedido! Redirecionando...')
    expect(localStorage.getItem('usuarioLogado')).toBe('teste@example.com')
  })

  it('botão desabilitado durante o loading', async () => {
    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.find('.auth-btn').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.auth-btn').text()).toBe('Entrando...')
  })

  it('exibe mensagem de erro corretamente', async () => {
    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senhaerrada')
    await wrapper.find('form').trigger('submit')

    await nextTick()

    const mensagem = wrapper.find('.mensagem.erro')
    expect(mensagem.exists()).toBe(true)
    expect(mensagem.text()).toBe('Email ou senha incorretos')
    expect(mensagem.classes()).toContain('erro')
  })

  it('sem usuários cadastrados', async () => {
    localStorage.removeItem('usuarios')
    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    await nextTick()

    expect(wrapper.vm.mensagem.texto).toBe('Email ou senha incorretos')
  })

  it('redirecionamento após login bem-sucedido', async () => {
    vi.useFakeTimers()
    const push = vi.spyOn(router, 'push')

    await wrapper.find('input[type="email"]').setValue('teste@example.com')
    await wrapper.find('input[type="password"]').setValue('senha123')
    await wrapper.find('form').trigger('submit')

    vi.advanceTimersByTime(1500)
    expect(push).toHaveBeenCalledWith('/home')
    vi.useRealTimers()
  })
})