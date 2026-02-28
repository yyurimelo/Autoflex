import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AssociationUpdate } from '../-update'
import userEvent from '@testing-library/user-event'
import { useUpdateAssociationMutation } from '@/http/hooks/association.hooks'
import type { AssociationDataModel } from '@/@types/association/AssociationDataModel'

vi.mock('@/http/hooks/association.hooks')
vi.mock('@/http/hooks/product.hooks', () => ({
  useAllProductsQuery: () => ({ data: [
    { id: 'prod1', name: 'Produto A', price: 10.00 },
    { id: 'prod2', name: 'Produto B', price: 20.00 },
  ], isLoading: false }),
}))
vi.mock('@/http/hooks/raw-material.hooks', () => ({
  useAllRawMaterialsQuery: () => ({ data: [
    { id: 'rm1', name: 'Matéria-prima A', stockQuantity: 5 },
    { id: 'rm2', name: 'Matéria-prima B', stockQuantity: 10 },
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

const mockMutateAsync = vi.fn()
const mockSetOpen = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useUpdateAssociationMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('AssociationUpdate', () => {
  const mockAssociation: AssociationDataModel = {
    id: '1',
    product: { id: 'prod1', name: 'Produto A', price: 10.00 },
    rawMaterial: { id: 'rm1', name: 'Matéria-prima A', stockQuantity: 5 },
    requiredQuantity: 2,
  }

  it('preenche o formulário com os dados da associação', () => {
    render(<AssociationUpdate item={mockAssociation} open={true} setOpen={mockSetOpen} />)

    expect(screen.getByDisplayValue('Produto A')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Matéria-prima A')).toBeInTheDocument()
    expect(screen.getByDisplayValue(2)).toBeInTheDocument()
  })

  it('envia o formulário com os dados atualizados', async () => {
    mockMutateAsync.mockResolvedValueOnce({})
    const user = userEvent.setup()

    render(<AssociationUpdate item={mockAssociation} open={true} setOpen={mockSetOpen} />)

    const materiaSelect = screen.getAllByTestId('combo-select')[1]
    await user.selectOptions(materiaSelect, 'rm2')

    await user.clear(screen.getByLabelText(/quantidade requerida/i))
    await user.type(screen.getByLabelText(/quantidade requerida/i), '5')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      id: '1',
      productId: 'prod1',
      rawMaterialId: 'rm2',
      requiredQuantity: 5,
    })
  })

  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()

    render(<AssociationUpdate item={mockAssociation} open={true} setOpen={mockSetOpen} />)

    await user.click(screen.getByRole('button', { name: /limpar/i }))

    const produtoSelect = screen.getAllByTestId('combo-select')[0]
    const materiaSelect = screen.getAllByTestId('combo-select')[1]

    expect(produtoSelect).toHaveValue('')
    expect(materiaSelect).toHaveValue('')
  })

  it('exibe erros ao submeter sem preencher campos obrigatórios', async () => {
    const user = userEvent.setup()

    render(<AssociationUpdate item={mockAssociation} open={true} setOpen={mockSetOpen} />)

    const produtoSelect = screen.getAllByTestId('combo-select')[0]
    await user.selectOptions(produtoSelect, '')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('exibe estado de carregamento durante o envio', async () => {
    vi.mocked(useUpdateAssociationMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    } as any)

    render(<AssociationUpdate item={mockAssociation} open={true} setOpen={mockSetOpen} />)

    expect(screen.getByRole('button', { name: /atualizando/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /atualizando/i })).toBeDisabled()
  })
})
