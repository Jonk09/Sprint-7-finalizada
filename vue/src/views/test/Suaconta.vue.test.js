import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Suaconta from '@/components/Suaconta.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Configuração do router mock
const routes = [
  { path: '/', name: 'login' },
  { path: '/home', name: 'home' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('Suaconta.vue', () => {
  let wrapper
  const mockUser = {
    email: 'usuario@teste.com',
    nome: 'Usuário Teste',
    senha: 'senha123'
  }

  beforeEach(async () => {
    // Configura localStorage mock
    localStorage.clear()
    localStorage.setItem('usuarioLogado', mockUser.email)
    localStorage.setItem('usuarios', JSON.stringify({
      [mockUser.email]: {
        nome: mockUser.nome,
        senha: mockUser.senha
      }
    }))

    wrapper = mount(Suaconta, {
      global: {
        plugins: [router]
      }
    })

    await router.isReady()
  })

  // Testes de renderização
  it('renderiza corretamente a estrutura principal', () => {
    expect(wrapper.find('.account-page').exists()).toBe(true)
    expect(wrapper.find('.account-container').exists()).toBe(true)
    expect(wrapper.find('.voltar-btn').exists()).toBe(true)
  })

  it('exibe as informações do usuário corretamente', () => {
    expect(wrapper.find('.account-info').exists()).toBe(true)
    expect(wrapper.find('p:nth-child(1)').text()).toContain(`Nome: ${mockUser.nome}`)
    expect(wrapper.find('p:nth-child(2)').text()).toContain(`Email: ${mockUser.email}`)
  })

  it('renderiza os botões de ação corretamente', () => {
    const buttons = wrapper.findAll('.account-action')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Redefinir Senha')
    expect(buttons[1].text()).toBe('Sair da Conta')
  })

  // Testes de navegação
  it('botão voltar redireciona para home', async () => {
    const push = vi.spyOn(router, 'push')
    await wrapper.find('.voltar-btn').trigger('click')
    expect(push).toHaveBeenCalledWith('/home')
  })

  // Testes de modais
  it('abre e fecha o modal de redefinir senha', async () => {
    expect(wrapper.vm.modalSenha).toBe(false)
    await wrapper.findAll('.account-action')[0].trigger('click')
    expect(wrapper.vm.modalSenha).toBe(true)
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    
    await wrapper.find('.modal-btn.cancel').trigger('click')
    expect(wrapper.vm.modalSenha).toBe(false)
  })

  it('abre e fecha o modal de sair', async () => {
    expect(wrapper.vm.modalSair).toBe(false)
    await wrapper.findAll('.account-action')[1].trigger('click')
    expect(wrapper.vm.modalSair).toBe(true)
    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    
    await wrapper.find('.modal-btn.cancel').trigger('click')
    expect(wrapper.vm.modalSair).toBe(false)
  })

  // Testes de funcionalidades
  it('redefine senha corretamente', async () => {
    const novaSenha = 'novasenha123'
    
    // Abre modal
    await wrapper.findAll('.account-action')[0].trigger('click')
    
    // Preenche nova senha
    await wrapper.find('input[type="password"]').setValue(novaSenha)
    await wrapper.find('.modal-btn.confirm').trigger('click')
    
    // Verifica se a senha foi atualizada
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    expect(usuarios[mockUser.email].senha).toBe(novaSenha)
    
    // Verifica notificação
    expect(wrapper.vm.notificacao.visible).toBe(true)
    expect(wrapper.vm.notificacao.message).toBe('Senha atualizada com sucesso!')
    expect(wrapper.vm.notificacao.type).toBe('success')
  })

  it('não permite senha com menos de 6 caracteres', async () => {
    const senhaCurta = '12345'
    
    await wrapper.findAll('.account-action')[0].trigger('click')
    await wrapper.find('input[type="password"]').setValue(senhaCurta)
    await wrapper.find('.modal-btn.confirm').trigger('click')
    
    // Verifica se a senha NÃO foi atualizada
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    expect(usuarios[mockUser.email].senha).toBe(mockUser.senha)
    
    // Verifica notificação de erro
    expect(wrapper.vm.notificacao.visible).toBe(true)
    expect(wrapper.vm.notificacao.message).toBe('A senha deve ter no mínimo 6 caracteres')
    expect(wrapper.vm.notificacao.type).toBe('error')
  })

  it('realiza logout corretamente', async () => {
    const push = vi.spyOn(router, 'push')
    
    await wrapper.findAll('.account-action')[1].trigger('click') // Abre modal
    await wrapper.find('.modal-content .modal-btn.confirm').trigger('click') // Confirma
    
    expect(localStorage.getItem('usuarioLogado')).toBeNull()
    expect(push).toHaveBeenCalledWith('/')
  })

  it('redireciona para login se não estiver autenticado', async () => {
    localStorage.removeItem('usuarioLogado')
    const push = vi.spyOn(router, 'push')
    
    // Recria o wrapper sem usuário logado
    wrapper = mount(Suaconta, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    expect(push).toHaveBeenCalledWith('/')
  })

  // Testes de notificação
  it('exibe e esconde notificação automaticamente', async () => {
    vi.useFakeTimers()
    
    wrapper.vm.mostrarNotificacao('Mensagem teste', 'success')
    expect(wrapper.vm.notificacao.visible).toBe(true)
    
    vi.advanceTimersByTime(3000)
    expect(wrapper.vm.notificacao.visible).toBe(false)
    
    vi.useRealTimers()
  })

  // Testes de estilo
  it('aplica classes CSS corretamente', () => {
    expect(wrapper.find('.account-page').classes()).toContain('account-page')
    expect(wrapper.find('.account-container').classes()).toContain('account-container')
    expect(wrapper.find('.voltar-btn').classes()).toContain('voltar-btn')
    
    // Verifica classes dos botões
    const buttons = wrapper.findAll('.account-action')
    expect(buttons[0].classes()).toContain('account-action')
    expect(buttons[1].classes()).toContain('logout')
  })
})