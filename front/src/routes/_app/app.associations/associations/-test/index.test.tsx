import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAssociationPaginationQuery } from '@/http/hooks/association.hooks'
import { AssociationsGrid } from '..'

vi.mock('@/http/hooks/association.hooks', () => ({
  useAssociationPaginationQuery: vi.fn(),
  useCreateAssociationMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useDeleteAssociationMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useUpdateAssociationMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}))
vi.mock('@/http/hooks/product.hooks', () => ({
  useAllProductsQuery: () => ({ data: [], isLoading: false }),
}))
vi.mock('@/http/hooks/raw-material.hooks', () => ({
  useAllRawMaterialsQuery: () => ({ data: [], isLoading: false }),
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
vi.mock('@/routes/_app/app.associations/associations/-create', () => ({
  AssociationCreate: () => <div />
}))
vi.mock('@/routes/_app/app.associations/associations/-filters', () => ({
  AssociationFilters: () => <div />
}))
vi.mock('@/routes/_app/app.associations/associations/-filters-tag', () => ({
  AssociationFiltersTag: () => <div />
}))
vi.mock('@/routes/_app/app.associations/associations/-actions', () => ({
  AssociationActions: () => <div />,
}))
vi.mock('@/routes/_app/app.associations/associations/-update', () => ({
  AssociationUpdate: () => <div />,
}))

beforeEach(() => {
  vi.mocked(useAssociationPaginationQuery).mockReturnValue({
    isLoading: false,
    data: undefined,
  } as any)
})

describe('AssociationsGrid', () => {
  it('renderiza associações vindas da API', () => {
    vi.mocked(useAssociationPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          {
            id: '1',
            product: { id: 'p1', name: 'Produto A', price: 10.00 },
            rawMaterial: { id: 'rm1', name: 'Matéria-prima A', stockQuantity: 5 },
            requiredQuantity: 2,
          },
          {
            id: '2',
            product: { id: 'p2', name: 'Produto B', price: 20.00 },
            rawMaterial: { id: 'rm2', name: 'Matéria-prima B', stockQuantity: 10 },
            requiredQuantity: 3,
          },
        ],
        totalPages: 3,
      },
    } as any)

    render(<AssociationsGrid />)

    expect(screen.getByText('Produto A')).toBeInTheDocument()
    expect(screen.getByText('Matéria-prima A')).toBeInTheDocument()
    expect(screen.getByText('Produto B')).toBeInTheDocument()
    expect(screen.getByText('Matéria-prima B')).toBeInTheDocument()
  })

  it('exibe paginação com total de páginas correto', () => {
    vi.mocked(useAssociationPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          {
            id: '1',
            product: { id: 'p1', name: 'Produto A', price: 10.00 },
            rawMaterial: { id: 'rm1', name: 'Matéria-prima A', stockQuantity: 8 },
            requiredQuantity: 2,
          },
        ],
        totalPages: 5,
      },
    } as any)

    render(<AssociationsGrid />)

    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

  it('mostra skeleton enquanto carrega', () => {
    vi.mocked(useAssociationPaginationQuery).mockReturnValue({
      isLoading: true,
      data: undefined,
    } as any)

    render(<AssociationsGrid />)

    expect(screen.queryByText('Produto A')).not.toBeInTheDocument()
  })
})
