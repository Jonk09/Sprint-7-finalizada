import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Contato from '@/components/Contato.vue'
import { nextTick } from 'vue'
import { RouterLink } from 'vue-router'

describe('Contato.vue', () => {
  let wrapper
  let windowOpenSpy

  beforeEach(() => {
    // Mock window.open
    windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => {})
    
    wrapper = mount(Contato, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  afterEach(() => {
    windowOpenSpy.mockRestore()
    wrapper.unmount()
  })

  // Teste 1: Renderização básica do componente
  it('renderiza corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // Teste 2: Exibe o logo corretamente
  it('exibe o logo com atributos corretos', () => {
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Logo SUPPLY AI')
  })

  // Teste 3: Exibe o título principal
  it('exibe o título SUPPLY AI', () => {
    expect(wrapper.find('h1').text()).toBe('SUPPLY AI')
  })

  // Teste 4: Exibe o subtítulo corretamente
  it('exibe o subtítulo sobre inovação', () => {
    expect(wrapper.find('header p').text()).toBe('Inovação que mantém sua produção em movimento')
  })

  // Teste 5: Verifica os links de navegação
  it('contém os links de navegação corretos', () => {
    const links = wrapper.findAllComponents({ name: 'RouterLink' })
    expect(links.length).toBe(3)
    expect(links[0].props('to')).toBe('/home')
    expect(links[1].props('to')).toBe('/sobre')
    expect(links[2].props('to')).toBe('/suaconta')
  })

  // Teste 6: Verifica o título da seção de contato
  it('exibe o título "Entre em Contato"', () => {
    expect(wrapper.find('.container h2').text()).toBe('Entre em Contato')
  })

  // Teste 7: Exibe informações de contato corretamente
  it('exibe email e telefone de contato', () => {
    const info = wrapper.find('.info-contato')
    expect(info.find('p:nth-child(1)').text()).toBe('Email: contato@supplyai.com')
    expect(info.find('p:nth-child(2)').text()).toBe('Telefone: (81) 98586-9074')
  })

  // Teste 8: Verifica a presença do chat
  it('contém o container do chat', () => {
    expect(wrapper.find('#chat-container').exists()).toBe(true)
  })

  // Teste 9: Verifica a estrutura do chat
  it('contém área de mensagens e input', () => {
    expect(wrapper.find('#chat-messages').exists()).toBe(true)
    expect(wrapper.find('#input-container').exists()).toBe(true)
    expect(wrapper.find('#user-input').exists()).toBe(true)
    expect(wrapper.find('#send-btn').exists()).toBe(true)
  })

  // Teste 10: Verifica o botão do WhatsApp
  it('exibe botão do WhatsApp fixo', () => {
    const btn = wrapper.find('#whatsapp-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('💬')
  })

  

  // Teste 12: Envio de mensagem vazia não faz nada
  it('não envia mensagem vazia', async () => {
    const input = wrapper.find('#user-input')
    await input.setValue('')
    await wrapper.find('#send-btn').trigger('click')
    
    expect(wrapper.vm.messages.length).toBe(0)
  })


  // Teste 15: Limpa input após enviar mensagem
  it('limpa o input após enviar mensagem', async () => {
    const input = wrapper.find('#user-input')
    await input.setValue('Teste')
    await wrapper.find('#send-btn').trigger('click')
    
    expect(wrapper.vm.userInput).toBe('')
  })

  // Teste 16: Envio com Enter funciona
  it('envia mensagem ao pressionar Enter', async () => {
    const input = wrapper.find('#user-input')
    await input.setValue('Oi')
    await input.trigger('keypress.enter')
    
    expect(wrapper.vm.messages.length).toBe(1)
  })

 
})