import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Estoque from '@/components/Estoque.vue'
import { RouterLink } from 'vue-router'

describe('Estoque.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Estoque, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  // Teste 1: Renderização básica
  it('renderiza corretamente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  // Teste 2: Estrutura principal
  it('contém estrutura básica com header, nav, container e footer', () => {
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('nav').exists()).toBe(true)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  // Teste 3: Logo e título
  it('exibe logo e título corretamente', () => {
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Logo SUPPLY AI')
    expect(wrapper.find('h1').text()).toBe('SUPPLY AI')
    expect(wrapper.find('header p').text()).toBe('Monitoramento de Estoque em Tempo Real')
  })

  // Teste 4: Navegação
  it('contém links de navegação corretos', () => {
    const links = wrapper.findAllComponents(RouterLink)
    expect(links.length).toBe(4)
    expect(links[0].props().to).toBe('/home')
    expect(links[1].props().to).toBe('/sobre')
    expect(links[2].props().to).toBe('/contato')
    expect(links[3].props().to).toBe('/suaconta')
  })

  // Teste 5: Seções de conteúdo
  it('renderiza todas as seções de conteúdo', () => {
    const sections = wrapper.findAll('.section')
    expect(sections.length).toBe(2)
    expect(sections[0].find('h2').text()).toBe('📦 Níveis de Estoque')
    expect(sections[1].find('h2').text()).toBe('📡 Atualização Inteligente')
  })

  // Teste 6: Tabela de estoque
  it('exibe tabela de estoque corretamente', () => {
    const table = wrapper.find('table')
    expect(table.exists()).toBe(true)
    
    const headers = table.findAll('th')
    expect(headers.length).toBe(3)
    expect(headers[0].text()).toBe('Matéria-prima')
    expect(headers[1].text()).toBe('Quantidade Atual (kg)')
    expect(headers[2].text()).toBe('Nível')
  })

  // Teste 7: Itens de estoque
  it('exibe todos os itens de estoque', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(5)
    
    const firstRowCells = rows[0].findAll('td')
    expect(firstRowCells[0].text()).toBe('Aço Inox')
    expect(firstRowCells[1].text()).toBe('120')
  })

  

  // Teste 9: Cálculo de porcentagem
  it('calcula porcentagens corretamente', () => {
    const vm = wrapper.vm
    expect(vm.getPercentage({ quantity: 50, maxQuantity: 100 })).toBe(50)
    expect(vm.getPercentage({ quantity: 30, maxQuantity: 100 })).toBe(30)
    expect(vm.getPercentage({ quantity: 75, maxQuantity: 150 })).toBe(50)
  })

  // Teste 10: Classes de nível
  it('determina classes de nível corretamente', () => {
    const vm = wrapper.vm
    expect(vm.getLevelClass({ quantity: 10, maxQuantity: 100 })).toBe('low')
    expect(vm.getLevelClass({ quantity: 40, maxQuantity: 100 })).toBe('medium')
    expect(vm.getLevelClass({ quantity: 80, maxQuantity: 100 })).toBe('high')
  })

 
})