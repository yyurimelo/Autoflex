import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useScopedFilters } from '@/hooks/use-scoped-filters'
import { useIsMobile } from '@/hooks/use-mobile'
import { RawMaterialFilters } from '../-filters'

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn().mockReturnValue(false),
}))
vi.mock('@/hooks/use-scoped-filters', () => ({
  useScopedFilters: vi.fn().mockReturnValue({
    filters: {},
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useIsMobile).mockReturnValue(false)
  vi.mocked(useScopedFilters).mockReturnValue({
    filters: {},
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  } as any)
})

describe('RawMaterialFilters', () => {
  it('renderiza o botão de filtrar', () => {
    render(<RawMaterialFilters />)
    expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão', async () => {
    const user = userEvent.setup()
    render(<RawMaterialFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))

    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/quantidade/i)).toBeInTheDocument()
  })

  it('chama setFilter ao submeter com nome preenchido', async () => {
    const mockSetFilter = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: {},
      setFilter: mockSetFilter,
      clearFilters: vi.fn(),
    } as any)

    const user = userEvent.setup()
    render(<RawMaterialFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Farinha')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockSetFilter).toHaveBeenCalledWith('name', 'Farinha')
  })

  it('não chama setFilter quando o valor não mudou', async () => {
    const mockSetFilter = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: { name: 'Farinha' },
      setFilter: mockSetFilter,
      clearFilters: vi.fn(),
    } as any)

    const user = userEvent.setup()
    render(<RawMaterialFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockSetFilter).not.toHaveBeenCalled()
  })

  it('chama clearFilters ao clicar em limpar', async () => {
    const mockClearFilters = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: {},
      setFilter: vi.fn(),
      clearFilters: mockClearFilters,
    } as any)

    const user = userEvent.setup()
    render(<RawMaterialFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(mockClearFilters).toHaveBeenCalled()
  })

  it('esconde o texto em modo mobile', () => {
    vi.mocked(useIsMobile).mockReturnValue(true)
    render(<RawMaterialFilters />)

    expect(screen.queryByText('Filtrar')).toHaveClass('hidden')
  })
})