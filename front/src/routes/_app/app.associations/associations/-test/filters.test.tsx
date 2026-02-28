import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AssociationFilters } from '../-filters'
import userEvent from '@testing-library/user-event'
import { useScopedFilters } from '@/hooks/use-scoped-filters'
import { useIsMobile } from '@/hooks/use-mobile'

vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: vi.fn().mockReturnValue(false),
}))
vi.mock('@/hooks/use-scoped-filters', () => ({
  useScopedFilters: vi.fn().mockReturnValue({
    filters: { productId: '', rawMaterialId: '' },
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  }),
}))
vi.mock('@/http/hooks/product.hooks', () => ({
  useAllProductsQuery: () => ({ data: [
    { id: 'prod1', name: 'Produto A', price: 10.00 },
  ], isLoading: false }),
}))
vi.mock('@/http/hooks/raw-material.hooks', () => ({
  useAllRawMaterialsQuery: () => ({ data: [
    { id: 'rm1', name: 'Matéria-prima A', stockQuantity: 5 },
  ], isLoading: false }),
}))
vi.mock('@/components/ui/combo', () => ({
  Combo: ({ itens, onSelect, placeholder, value }: any) => (
    <select
      value={value}
      data-placeholder={placeholder}
      onChange={(e) => onSelect?.(e.target.value)}
      data-testid="combo-select"
    >
      <option value="">{placeholder}</option>
      {itens?.map((item: any) => (
        <option key={item.value} value={item.value}>{item.label}</option>
      ))}
    </select>
  ),
}))

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useIsMobile).mockReturnValue(false)
  vi.mocked(useScopedFilters).mockReturnValue({
    filters: { productId: '', rawMaterialId: '' },
    setFilter: vi.fn(),
    clearFilters: vi.fn(),
  } as any)
})

describe('AssociationFilters', () => {
  it('renderiza o botão de filtrar', () => {
    render(<AssociationFilters />)
    expect(screen.getByRole('button', { name: /filtrar/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão de filtrar', async () => {
    const user = userEvent.setup()
    render(<AssociationFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('chama setFilter ao submeter com produto preenchido', async () => {
    const mockSetFilter = vi.fn()
    const mockClearFilters = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: { productId: '', rawMaterialId: '' },
      setFilter: mockSetFilter,
      clearFilters: mockClearFilters,
    } as any)

    const user = userEvent.setup()
    render(<AssociationFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))

    const produtoSelect = screen.getAllByTestId('combo-select')[0]
    await user.selectOptions(produtoSelect, 'prod1')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockSetFilter).toHaveBeenCalledWith('productId', 'prod1')
  })

  it('limpa os filtros ao clicar em limpar', async () => {
    const mockClearFilters = vi.fn()

    vi.mocked(useScopedFilters).mockReturnValue({
      filters: { productId: 'prod1', rawMaterialId: '' },
      setFilter: vi.fn(),
      clearFilters: mockClearFilters,
    } as any)

    const user = userEvent.setup()
    render(<AssociationFilters />)

    await user.click(screen.getByRole('button', { name: /filtrar/i }))
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(mockClearFilters).toHaveBeenCalled()
  })
})
