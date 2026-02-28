import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useSuggestionPaginationQuery } from '@/http/hooks/suggestion.hooks'
import { Suggestions } from '..'

vi.mock('@/http/hooks/suggestion.hooks', () => ({
  useSuggestionPaginationQuery: vi.fn(),
}))
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => () => ({ component: null }),
}))
vi.mock('@/hooks/use-global-page-size', () => ({
  useGlobalPageSize: () => ({ pageSize: 10, setSize: vi.fn() }),
}))

beforeEach(() => {
  vi.mocked(useSuggestionPaginationQuery).mockReturnValue({
    isLoading: false,
    data: undefined,
  } as any)
})

describe('Suggestions', () => {
  it('renderiza sugestões vindas da API', () => {
    vi.mocked(useSuggestionPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          {
            productId: '1',
            productName: 'Produto A',
            producibleQuantity: 100,
            unitCost: 5.50,
            limitingMaterial: 'Matéria-prima X',
            finalPrice: 10.00,
          },
          {
            productId: '2',
            productName: 'Produto B',
            producibleQuantity: 200,
            unitCost: 3.00,
            limitingMaterial: 'Matéria-prima Y',
            finalPrice: 8.00,
          },
        ],
        totalPages: 3,
      },
    } as any)

    render(<Suggestions />)

    expect(screen.getByText('Produto A')).toBeInTheDocument()
    expect(screen.getByText('Produto B')).toBeInTheDocument()
  })

  it('exibe paginação com total de páginas correto', () => {
    vi.mocked(useSuggestionPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          {
            productId: '1',
            productName: 'Produto A',
            producibleQuantity: 100,
            unitCost: 6.60,
            limitingMaterial: 'Matéria-prima X',
            finalPrice: 10.00,
          },
        ],
        totalPages: 5,
      },
    } as any)

    render(<Suggestions />)

    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

  it('mostra skeleton enquanto carrega', () => {
    vi.mocked(useSuggestionPaginationQuery).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as any)

    render(<Suggestions />)

    expect(screen.queryByText('Produto A')).not.toBeInTheDocument()
  })
})
