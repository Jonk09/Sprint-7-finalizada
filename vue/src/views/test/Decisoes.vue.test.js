import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import { nextTick } from 'vue'
import { Chart } from 'chart.js/auto'

// Mock do Chart.js
vi.mock('chart.js/auto', () => {
  const mockChart = {
    destroy: vi.fn(),
    update: vi.fn()
  }
  return {
    default: vi.fn(() => mockChart)
  }
})

describe('Home.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(Home, {
      global: {
        stubs: ['router-link']
      },
      attachTo: document.body
    })
    await flushPromises()
  })

  afterEach(() => {
    vi.clearAllMocks()
    wrapper.unmount()
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


 
  // Teste 9: Rodapé
  it('exibe rodapé corretamente', () => {
    const footer = wrapper.find('footer')
    expect(footer.text()).toContain('© 2025 supplyai. Todos os direitos reservados.')
  })

 
})