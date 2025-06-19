import { mount } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

describe('Home.vue', () => {
  let router

  beforeEach(() => {
    router = createRouter({
      history: createWebHistory(),
      routes: [],
    })

    // Mock do push do router
    router.push = vi.fn()
  })

  it('renderiza o título principal', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.text()).toContain('SUPPLY AI')
  })

  it('renderiza o subtítulo', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.text()).toContain('Inovação que mantém sua produção em movimento')
  })

  it('renderiza o logo', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })
    const img = wrapper.find('img[alt="Logo SUPPLY AI"]')
    expect(img.exists()).toBe(true)
  })

  it('renderiza os links de navegação', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })
    const links = wrapper.findAll('a')
    const linkTexts = links.map(link => link.text().toLowerCase())
    expect(linkTexts).toContain('sobre')
    expect(linkTexts).toContain('contato')
    expect(linkTexts).toContain('sua conta')
  })

  it('renderiza os 7 botões com os textos corretos', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })

    const botoesEsperados = [
      '📢 Alertas e Previsões Inteligentes',
      '💰 Redução de Custos',
      '📊 Decisões com Dados',
      '📦 Estoque em Tempo Real',
      '🚀 Escalabilidade',
      '🔌 Integração com Sistemas',
      '🤝 Conexão entre Empresas',
    ]

    const botoes = wrapper.findAll('button')
    const textosDosBotoes = botoes.map(btn => btn.text())

    botoesEsperados.forEach(texto => {
      expect(textosDosBotoes).toContain(texto)
    })
  })

  it('footer contém direitos autorais', () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.text().toLowerCase()).toContain('todos os direitos reservados')
  })

  it('método goTo navega para a página correta', async () => {
    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })

    const instance = wrapper.vm
    await instance.goTo('alertas')

    expect(router.push).toHaveBeenCalledWith('/alertas')
  })

  it('método logout remove usuário e navega para /suaconta', async () => {
    localStorage.setItem('usuarioLogado', 'teste')

    const wrapper = mount(Home, {
      global: {
        plugins: [router],
      },
    })

    const instance = wrapper.vm
    await instance.logout()

    expect(localStorage.getItem('usuarioLogado')).toBeNull()
    expect(router.push).toHaveBeenCalledWith('/suaconta')
  })
})
