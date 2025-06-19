import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Escalabilidade from '@/components/Escalabilidade.vue'
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

describe('Escalabilidade.vue', () => {
  let wrapper

  beforeEach(async () => {
    wrapper = mount(Escalabilidade, {
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

  
})