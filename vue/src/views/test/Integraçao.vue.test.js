import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Integracao from '@/components/Integracao.vue'
import { RouterLink } from 'vue-router'

describe('Integracao.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Integracao, {
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
    expect(wrapper.find('header p').text()).toBe('Integração de Sistemas para um Suprimento Inteligente')
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
    expect(sections.length).toBe(3)
    expect(sections[0].find('h2').text()).toBe('🔌 Integração com Sistemas')
    expect(sections[1].find('h2').text()).toBe('🔁 Fluxo de Integração SUPPLY AI')
    expect(sections[2].find('h2').text()).toBe('🎯 Resultado')
  })

  // Teste 6: Lista de integrações
  it('exibe lista de integrações corretamente', () => {
    const items = wrapper.findAll('.section:nth-of-type(1) li')
    expect(items.length).toBe(4)
    expect(items[0].text()).toContain('ERPs:')
    expect(items[1].text()).toContain('CRMs:')
    expect(items[2].text()).toContain('IoT:')
    expect(items[3].text()).toContain('API REST:')
  })

  // Teste 7: Fluxo de integração
  it('exibe fluxo de integração corretamente', () => {
    const boxes = wrapper.findAll('.box')
    expect(boxes.length).toBe(4)
    expect(boxes[0].text()).toBe('Sensor IoT')
    expect(boxes[1].text()).toBe('SUPPLY AI')
    expect(boxes[2].text()).toBe('ERP / CRM')
    expect(boxes[3].text()).toBe('Pedido Otimizado')
    
    const arrows = wrapper.findAll('.arrow')
    expect(arrows.length).toBe(3)
  })

  // Teste 8: Lista de resultados
  it('exibe lista de resultados corretamente', () => {
    const resultados = wrapper.findAll('.section:nth-of-type(3) li')
    expect(resultados.length).toBe(4)
    expect(resultados[0].text()).toContain('Evite compras emergenciais')
    expect(resultados[1].text()).toContain('Tenha previsões precisas')
    expect(resultados[2].text()).toContain('Automatize a reposição')
    expect(resultados[3].text()).toContain('Mantenha a produção ativa')
  })


  // Teste 16: Layout do fluxo de integração
  it('organiza o fluxo de integração corretamente', () => {
    const flowchart = wrapper.find('.flowchart')
    expect(flowchart.classes()).toContain('text-center')
    
    const flexContainer = wrapper.find('.d-flex')
    expect(flexContainer.classes()).toContain('justify-content-center')
    expect(flexContainer.classes()).toContain('align-items-center')
    expect(flexContainer.classes()).toContain('flex-wrap')
    expect(flexContainer.classes()).toContain('gap-3')
  })
})