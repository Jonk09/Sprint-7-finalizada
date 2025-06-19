import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Cadastro from '@/components/Cadastro.vue'
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

describe('Cadastro.vue', () => {
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
  })

  // Teste 1: Renderização básica do componente
  it('renderiza corretamente', () => {
    const wrapper = mount(Cadastro)
    expect(wrapper.exists()).toBe(true)
  })

  // Teste 2: Exibe o logo corretamente
  it('exibe o logo com atributos corretos', () => {
    const wrapper = mount(Cadastro)
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Logo SUPPLY AI')
  })

  // Teste 3: Exibe o título corretamente
  it('exibe o título SUPPLY AI', () => {
    const wrapper = mount(Cadastro)
    expect(wrapper.find('h1').text()).toBe('SUPPLY AI')
  })

  // Teste 4: Campos de formulário existem
  it('contém todos os campos do formulário', () => {
    const wrapper = mount(Cadastro)
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(3)
    expect(inputs[0].attributes('type')).toBe('text')
    expect(inputs[1].attributes('type')).toBe('email')
    expect(inputs[2].attributes('type')).toBe('password')
  })

  // Teste 5: Link para login existe
  it('contém link para página de login', () => {
    const wrapper = mount(Cadastro)
    const link = wrapper.find('.auth-link')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('Já tem uma conta? Entrar')
  })

  // Teste 6: Botão de cadastro existe
  it('contém botão de cadastro', () => {
    const wrapper = mount(Cadastro)
    const btn = wrapper.find('.auth-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('Cadastrar')
  })

  // Teste 7: Validação de senha curta
  it('exibe erro quando senha tem menos de 6 caracteres', async () => {
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="password"]').setValue('12345')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.vm.mensagem.texto).toBe('A senha deve ter no mínimo 6 caracteres')
    expect(wrapper.vm.mensagem.erro).toBe(true)
    expect(wrapper.find('.mensagem.erro').exists()).toBe(true)
  })

  // Teste 8: Validação de email já cadastrado
  it('exibe erro quando email já está cadastrado', async () => {
    // Configurar dados no localStorage
    localStorage.setItem('usuarios', JSON.stringify({
      'existente@teste.com': { nome: 'Usuário Existente', senha: '123456' }
    }))
    
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="email"]').setValue('existente@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.vm.mensagem.texto).toBe('Este e-mail já está cadastrado')
    expect(wrapper.vm.mensagem.erro).toBe(true)
    expect(wrapper.find('.mensagem.erro').exists()).toBe(true)
  })

  // Teste 9: Cadastro bem-sucedido
  it('cadastra novo usuário com sucesso', async () => {
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="text"]').setValue('Novo Usuário')
    await wrapper.find('input[type="email"]').setValue('novo@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    
    // Verifica loading state
    expect(wrapper.vm.loading).toBe(true)
    
    await nextTick()
    
    // Verifica mensagem de sucesso
    expect(wrapper.vm.mensagem.texto).toBe('Cadastro realizado com sucesso! Redirecionando...')
    expect(wrapper.vm.mensagem.erro).toBe(false)
    expect(wrapper.find('.mensagem:not(.erro)').exists()).toBe(true)
    
    // Verifica dados no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    expect(usuarios['novo@teste.com']).toEqual({
      nome: 'Novo Usuário',
      senha: '123456'
    })
    expect(localStorage.getItem('usuarioLogado')).toBe('novo@teste.com')
    
    // Verifica redirecionamento
    await new Promise(resolve => setTimeout(resolve, 1600)) // Aguarda o timeout
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })

  // Teste 10: Estado de loading
  it('mostra estado de loading durante o cadastro', async () => {
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="text"]').setValue('Teste Loading')
    await wrapper.find('input[type="email"]').setValue('loading@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.vm.loading).toBe(true)
    expect(wrapper.find('.auth-btn').text()).toBe('Cadastrando...')
    expect(wrapper.find('.auth-btn').attributes('disabled')).toBeDefined()
  })

  // Teste 11: Normalização de email
  it('normaliza email para lowercase antes de salvar', async () => {
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="text"]').setValue('Usuário Maiúsculo')
    await wrapper.find('input[type="email"]').setValue('MAIUSCULO@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    
    await nextTick()
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    expect(usuarios['maiusculo@teste.com']).toBeDefined()
    expect(localStorage.getItem('usuarioLogado')).toBe('maiusculo@teste.com')
  })

  // Teste 12: Trim no nome
  it('remove espaços extras no nome do usuário', async () => {
    const wrapper = mount(Cadastro)
    
    await wrapper.find('input[type="text"]').setValue('  Nome com espaços  ')
    await wrapper.find('input[type="email"]').setValue('trim@teste.com')
    await wrapper.find('input[type="password"]').setValue('123456')
    await wrapper.find('form').trigger('submit.prevent')
    
    await nextTick()
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    expect(usuarios['trim@teste.com'].nome).toBe('Nome com espaços')
  })

 


 
})