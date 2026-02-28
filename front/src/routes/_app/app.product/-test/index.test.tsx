import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Product } from '..'
import { useProductPaginationQuery } from '@/http/hooks/product.hooks'


vi.mock('@/http/hooks/product.hooks', () => ({
  useProductPaginationQuery: vi.fn(),
  useCreateProductMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useDeleteProductMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useUpdateProductMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}))
vi.mock('@tanstack/react-router', () => ({
  createFileRoute: () => () => ({ component: null }),
}))
vi.mock('@/hooks/use-global-page-size', () => ({
  useGlobalPageSize: () => ({ pageSize: 10, setSize: vi.fn() }),
}))
vi.mock('@/hooks/use-scoped-filters', () => ({
  useScopedFilters: () => ({ filters: { page: 0 }, setPage: vi.fn() }),
}))
vi.mock('@/routes/_app/app.product/-create', () => ({ 
  ProductCreate: () => <div /> 
}))
vi.mock('@/routes/_app/app.product/-filters', () => ({ 
  ProductFilters: () => <div /> 
}))
vi.mock('@/routes/_app/app.product/-filters-tag', () => ({ 
  ProductFiltersTag: () => <div /> 
}))

beforeEach(() => {
  vi.mocked(useProductPaginationQuery).mockReturnValue({
    isLoading: false,
    data: undefined,
  } as any)
})

describe('Product', () => {
  it('renderiza produtos vindos da API', () => {
    vi.mocked(useProductPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          { id: 1, name: 'Produto A', price: 10.00 },
          { id: 2, name: 'Produto B', price: 20.00 },
        ],
        totalPages: 3,
      },
    } as any)

    render(<Product />)

    expect(screen.getByText('Produto A')).toBeInTheDocument()
    expect(screen.getByText('Produto B')).toBeInTheDocument()
  })

  it('exibe paginação com total de páginas correto', () => {
    vi.mocked(useProductPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [{ id: 1, name: 'Produto A', price: 10.00 }],
        totalPages: 5,
      },
    } as any)

    render(<Product />)

    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

  it('mostra skeleton enquanto carrega', () => {
    vi.mocked(useProductPaginationQuery).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as any)

    render(<Product />)

    expect(screen.queryByText('Produto A')).not.toBeInTheDocument()
  })
})