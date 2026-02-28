import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductFilters } from '../-filters'
import userEvent from '@testing-library/user-event'
import { useScopedFilters } from '@/hooks/use-scoped-filters'
import { useIsMobile } from '@/hooks/use-mobile' // adiciona

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn().mockReturnValue(false), // troca pra vi.fn()
}))
vi.mock('@/hooks/use-scoped-filters', () => ({
  useScopedFilters: vi.fn().mockReturnValue({
    filters: { name: '', price: '' },
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useIsMobile).mockReturnValue(false)
  vi.mocked(useScopedFilters).mockReturnValue({
    filters: { name: '', price: '' },
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  } as any)
})

describe('ProductFilters', () => {
  it('renderiza o botão de filtrar', () => {
    render(<ProductFilters />)
    expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão de filtrar', async () => {
    const user = userEvent.setup()
    render(<ProductFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('preenche e envia o formulário de filtros', async () => {
    const mockSetFilter = vi.fn()
    const mockClearFilters = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: { name: '', price: '' },
      setFilter: mockSetFilter,
      clearFilters: mockClearFilters,
    } as any)

    const user = userEvent.setup()
    render(<ProductFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Produto Teste')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockSetFilter).toHaveBeenCalledWith('name', 'Produto Teste')
  })

  it('limpa os filtros ao clicar em limpar', async () => {
    const mockClearFilters = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: { name: '', price: '' },
      setFilter: vi.fn(),
      clearFilters: mockClearFilters,
    } as any)

    const user = userEvent.setup()
    render(<ProductFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(mockClearFilters).toHaveBeenCalled()
  })

})