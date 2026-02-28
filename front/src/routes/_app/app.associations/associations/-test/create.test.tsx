import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AssociationCreate } from '../-create'
import userEvent from '@testing-library/user-event'
import { useCreateAssociationMutation } from '@/http/hooks/association.hooks'

vi.mock('@/http/hooks/association.hooks')
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))
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

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useCreateAssociationMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('AssociationCreate', () => {
  it('renderiza o botão de abrir', () => {
    render(<AssociationCreate />)
    expect(screen.getByRole('button', { name: /criar novo/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão de criar', async () => {
    const user = userEvent.setup()

    render(<AssociationCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    expect(screen.getByText('Criar nova associação')).toBeInTheDocument()
  })

  it('exibe erros ao submeter sem preencher', async () => {
    const user = userEvent.setup()
    render(<AssociationCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    const errors = await screen.findAllByText('Campo obrigatório')
    expect(errors.length).toBeGreaterThan(0)
  })

  it('envia o formulário com os dados preenchidos', async () => {
    mockMutateAsync.mockResolvedValueOnce({})

    const user = userEvent.setup()
    render(<AssociationCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    const produtoSelect = screen.getAllByTestId('combo-select')[0]
    const materiaSelect = screen.getAllByTestId('combo-select')[1]

    await user.selectOptions(produtoSelect, 'prod1')
    await user.selectOptions(materiaSelect, 'rm1')
    await user.clear(screen.getByLabelText(/quantidade requerida/i))
    await user.type(screen.getByLabelText(/quantidade requerida/i), '5')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      productId: 'prod1',
      rawMaterialId: 'rm1',
      requiredQuantity: 5,
    })
  })

  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()
    render(<AssociationCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    const produtoSelect = screen.getAllByTestId('combo-select')[0]

    await user.selectOptions(produtoSelect, 'prod1')
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(produtoSelect).toHaveValue('')
  })

  it('reseta o formulário após enviar com sucesso', async () => {
    mockMutateAsync.mockResolvedValueOnce({})

    const user = userEvent.setup()
    render(<AssociationCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    const produtoSelect = screen.getAllByTestId('combo-select')[0]
    const materiaSelect = screen.getAllByTestId('combo-select')[1]

    await user.selectOptions(produtoSelect, 'prod1')
    await user.selectOptions(materiaSelect, 'rm1')
    await user.clear(screen.getByLabelText(/quantidade requerida/i))
    await user.type(screen.getByLabelText(/quantidade requerida/i), '5')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(produtoSelect).toHaveValue('')
    expect(materiaSelect).toHaveValue('')
  })
})
