import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Home from '@/components/Home.vue'
import { nextTick } from 'vue'
import { Chart } from 'chart.js'

// Mock do Chart.js
vi.mock('chart.js', () => {
  const mockChart = {
    register: vi.fn(),
    getRegistry: vi.fn(() => ({ add: vi.fn(), remove: vi.fn() })),
    registerables: []
  }
  
  return {
    Chart: vi.fn(() => mockChart),
    registerables: []
  }
})

describe('Home.vue', () => {
  let wrapper

  beforeEach(() => {
    // Configurar mocks antes de cada teste
    wrapper = mount(Home, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  afterEach(() => {
    // Limpar mocks após cada teste
    vi.clearAllMocks()
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

  
})