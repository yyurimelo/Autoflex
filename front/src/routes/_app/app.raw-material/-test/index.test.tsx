import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRawMaterialPaginationQuery } from '@/http/hooks/raw-material.hooks'
import { RawMaterial } from '..'

vi.mock('@/http/hooks/raw-material.hooks', () => ({
  useRawMaterialPaginationQuery: vi.fn(),
  useCreateRawMaterialMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useDeleteRawMaterialMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
  useUpdateRawMaterialMutation: () => ({
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
vi.mock('@/routes/_app/app.raw-material/-create', () => ({
  RawMaterialCreate: () => <div />
}))
vi.mock('@/routes/_app/app.raw-material/-filters', () => ({
  RawMaterialFilters: () => <div />
}))
vi.mock('@/routes/_app/app.raw-material/-filters-tag', () => ({
  RawMaterialFiltersTag: () => <div />
}))

beforeEach(() => {
  vi.mocked(useRawMaterialPaginationQuery).mockReturnValue({
    isLoading: false,
    data: undefined,
  } as any)
})

describe('RawMaterial', () => {
  it('renderiza matérias-primas vindas da API', () => {
    vi.mocked(useRawMaterialPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          { id: 1, name: 'Matéria-prima A', stockQuantity: 5 },
          { id: 2, name: 'Matéria-prima B', stockQuantity: 10 },
        ],
        totalPages: 3,
      },
    } as any)

    render(<RawMaterial />)

    expect(screen.getByText('Matéria-prima A')).toBeInTheDocument()
    expect(screen.getByText('Matéria-prima B')).toBeInTheDocument()

  })

  it('exibe paginação com total de páginas correto', () => {
    vi.mocked(useRawMaterialPaginationQuery).mockReturnValue({
      isLoading: false,
      data: {
        content: [{ id: 2, name: 'Matéria-prima B', stockQuantity: 10 }],
        totalPages: 5,
      },
    } as any)

    render(<RawMaterial />)

    expect(screen.getByText(/5/)).toBeInTheDocument()
  })

})