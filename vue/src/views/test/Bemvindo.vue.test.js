import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BemVindo from '@/components/BemVindo.vue'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

// Mock do localStorage e router
const mockLocalStorage = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString() },
    removeItem: (key) => { delete store[key] },
    clear: () => { store = {} }
  }
})()

const mockRouter = {
  push: vi.fn()
}

describe('BemVindo.vue', () => {
  beforeEach(() => {
    // Configurar mocks antes de cada teste
    vi.stubGlobal('localStorage', mockLocalStorage)
    vi.mock('vue-router', () => ({
      useRouter: () => mockRouter
    }))
  })

  afterEach(() => {
    // Limpar após cada teste
    mockLocalStorage.clear()
    mockRouter.push.mockClear()
    document.body.className = ''
  })

  // Teste 1: Renderização básica do componente
  it('renderiza corretamente', () => {
    // Configurar dados no localStorage
    localStorage.setItem('usuarioLogado', 'teste@example.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { nome: 'Usuário Teste' }
    }))

    const wrapper = mount(BemVindo)
    expect(wrapper.exists()).toBe(true)
  })

  // Teste 2: Exibe o nome do usuário corretamente
  it('exibe o nome do usuário quando logado', async () => {
    // Configurar dados no localStorage
    localStorage.setItem('usuarioLogado', 'teste@example.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { nome: 'Usuário Teste' }
    }))

    const wrapper = mount(BemVindo)
    await nextTick() // Aguardar atualização reativa
    
    expect(wrapper.find('h1 span').text()).toBe('Usuário Teste')
  })

  // Teste 3: Redireciona quando não há usuário logado
  it('redireciona para a página inicial quando não há usuário logado', async () => {
    localStorage.clear()
    
    mount(BemVindo)
    await nextTick()
    
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  // Teste 4: Redireciona quando usuário não existe no localStorage
  it('redireciona quando usuário não existe no registro', async () => {
    localStorage.setItem('usuarioLogado', 'inexistente@teste.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'outro@teste.com': { nome: 'Outro Usuário' }
    }))
    
    mount(BemVindo)
    await nextTick()
    
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  // Teste 5: Adiciona classe ao body quando montado
  it('adiciona classe ao body quando montado', async () => {
    localStorage.setItem('usuarioLogado', 'teste@example.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { nome: 'Usuário Teste' }
    }))
    
    mount(BemVindo)
    await nextTick()
    
    expect(document.body.classList.contains('fundo-bemvindo')).toBe(true)
  })

  // Teste 6: Remove classe do body quando desmontado
  it('remove classe do body quando desmontado', async () => {
    localStorage.setItem('usuarioLogado', 'teste@example.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { nome: 'Usuário Teste' }
    }))
    
    const wrapper = mount(BemVindo)
    await nextTick()
    wrapper.unmount()
    
    expect(document.body.classList.contains('fundo-bemvindo')).toBe(false)
  })

  // Teste 7: Botão de entrar funciona corretamente
  it('remove usuário logado e redireciona ao clicar no botão', async () => {
    localStorage.setItem('usuarioLogado', 'teste@example.com')
    localStorage.setItem('usuarios', JSON.stringify({
      'teste@example.com': { nome: 'Usuário Teste' }
    }))
    
    const wrapper = mount(BemVindo)
    await nextTick()
    
    await wrapper.find('.btn-logout').trigger('click')
    
    expect(localStorage.getItem('usuarioLogado')).toBeNull()
    expect(mockRouter.push).toHaveBeenCalledWith('/home')
  })

  
})