import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alertas from '@/components/Alertas.vue'

describe('Alertas.vue', () => {
  // Mock do Bootstrap para os testes
  document.head.innerHTML += `
    <style>
      .shadow { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
      .rounded { border-radius: 0.25rem!important; }
      .mb-4 { margin-bottom: 1.5rem!important; }
      .p-4 { padding: 1.5rem!important; }
      .fw-bold { font-weight: 700!important; }
      .py-3 { padding-top: 1rem!important; padding-bottom: 1rem!important; }
      .px-4 { padding-left: 1.5rem!important; padding-right: 1.5rem!important; }
      .shadow-sm { box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important; }
      .list-group { display: flex; flex-direction: column; padding-left: 0; }
      .list-group-item { position: relative; display: block; padding: 0.5rem 1rem; }
      .bg-dark { background-color: #212529!important; }
      .text-light { color: #f8f9fa!important; }
      .border-0 { border: 0!important; }
    </style>
  `

  // Teste 1: Renderização básica do componente
  it('renderiza corretamente', () => {
    const wrapper = mount(Alertas)
    expect(wrapper.exists()).toBe(true)
  })

  // Teste 2: Verifica se o logo está sendo exibido
  it('exibe o logo corretamente', () => {
    const wrapper = mount(Alertas)
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('alt')).toBe('Logo SUPPLY AI')
  })

  // Teste 3: Verifica o título principal
  it('exibe o título SUPPLY AI', () => {
    const wrapper = mount(Alertas)
    expect(wrapper.find('h1').text()).toBe('SUPPLY AI')
  })

  // Teste 4: Verifica o subtítulo
  it('exibe o subtítulo corretamente', () => {
    const wrapper = mount(Alertas)
    expect(wrapper.find('header p').text()).toBe('Alertas e Previsões Inteligentes')
  })

  // Teste 5: Verifica os links de navegação
  it('contém os links de navegação corretos', () => {
    const wrapper = mount(Alertas)
    const links = wrapper.findAll('nav a')
    expect(links.length).toBe(4)
    expect(links[0].text()).toBe('Início')
    expect(links[1].text()).toBe('Sobre')
    expect(links[2].text()).toBe('Contato')
    expect(links[3].text()).toBe('Sua conta')
  })

  // Teste 6: Verifica os alertas
  it('exibe os alertas corretamente', () => {
    const wrapper = mount(Alertas)
    const alertas = wrapper.vm.alertas
    const alertElements = wrapper.findAll('.custom-alert')
    
    expect(alertElements.length).toBe(alertas.length)
    
    alertas.forEach((alerta, index) => {
      expect(alertElements[index].text()).toBe(alerta)
    })
  })

  // Teste 7: Verifica as previsões
  it('exibe as previsões corretamente', () => {
    const wrapper = mount(Alertas)
    const previsoes = wrapper.vm.previsoes
    const forecastElements = wrapper.findAll('.forecast')
    
    expect(forecastElements.length).toBe(previsoes.length)
    
    previsoes.forEach((previsao, index) => {
      expect(forecastElements[index].text()).toBe(previsao)
    })
  })

  // Teste 8: Verifica as recomendações
  it('exibe as recomendações corretamente', () => {
    const wrapper = mount(Alertas)
    const recommendations = wrapper.vm.recommendations
    const recommendationElements = wrapper.findAll('.list-group-item')
    
    expect(recommendationElements.length).toBe(recommendations.length)
    
    recommendations.forEach((recomendacao, index) => {
      expect(recommendationElements[index].text()).toBe(recomendacao)
    })
  })

  // Teste 9: Verifica as classes das seções
  it('aplica as classes corretamente nas seções', () => {
    const wrapper = mount(Alertas)
    const sections = wrapper.findAll('.section')
    
    expect(sections.length).toBe(3)
    
    sections.forEach(section => {
      expect(section.classes()).toContain('shadow')
      expect(section.classes()).toContain('rounded')
      expect(section.classes()).toContain('mb-4')
      expect(section.classes()).toContain('p-4')
    })
  })

  // Teste 10: Verifica o rodapé
  it('exibe o rodapé corretamente', () => {
    const wrapper = mount(Alertas)
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.text()).toContain('© 2025 supplyai. Todos os direitos reservados.')
  })

  // Teste 11: Verifica a navegação
  it('os links de navegação têm os hrefs corretos', () => {
    const wrapper = mount(Alertas)
    const links = wrapper.findAll('nav a')
    
    expect(links[0].attributes('href')).toBe('/home')
    expect(links[1].attributes('href')).toBe('/sobre')
    expect(links[2].attributes('href')).toBe('/contato')
    expect(links[3].attributes('href')).toBe('/suaconta')
  })

  // Teste 12: Verifica as classes dos alertas
  it('aplica classes específicas aos alertas', () => {
    const wrapper = mount(Alertas)
    const alert = wrapper.find('.custom-alert')
    
    expect(alert.classes()).toContain('fw-bold')
    expect(alert.classes()).toContain('py-3')
    expect(alert.classes()).toContain('px-4')
  })

  // Teste 13: Verifica as classes das previsões
  it('aplica classes específicas às previsões', () => {
    const wrapper = mount(Alertas)
    const forecast = wrapper.find('.forecast')
    
    expect(forecast.classes()).toContain('py-3')
    expect(forecast.classes()).toContain('px-4')
  })

  // Teste 14: Verifica as classes do container
  it('o container principal tem a classe container', () => {
    const wrapper = mount(Alertas)
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
  })

  // Teste 15: Verifica as classes do rodapé
  it('aplica classes corretas no rodapé', () => {
    const wrapper = mount(Alertas)
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
  })

  // Teste 16: Verifica o posicionamento do logo
  it('o logo tem a classe logo', () => {
    const wrapper = mount(Alertas)
    const logo = wrapper.find('.logo')
    expect(logo.exists()).toBe(true)
  })

  // Teste 17: Verifica a barra de navegação
  it('a barra de navegação existe', () => {
    const wrapper = mount(Alertas)
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
  })

  // Teste 18: Verifica as seções
  it('as seções têm a classe section', () => {
    const wrapper = mount(Alertas)
    const section = wrapper.find('.section')
    expect(section.exists()).toBe(true)
  })

  // Teste 19: Verifica os títulos das seções
  it('os títulos das seções existem', () => {
    const wrapper = mount(Alertas)
    const titles = wrapper.findAll('h2')
    expect(titles.length).toBe(3)
  })

  // Teste 20: Verifica os itens da lista
  it('os itens da lista de recomendações existem', () => {
    const wrapper = mount(Alertas)
    const items = wrapper.findAll('.list-group-item')
    expect(items.length).toBe(5)
  })
})