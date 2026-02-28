import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductUpdate } from '../-update'
import userEvent from '@testing-library/user-event'
import { useUpdateProductMutation } from '@/http/hooks/product.hooks'
import type { ProductDataModel } from '@/@types/product/ProductDataModel'

// Mocks
vi.mock('@/http/hooks/product.hooks')
vi.mock('@/components/ui/monetary', () => ({
  Monetary: ({ onChange, value }: { onChange: (v: number) => void, value: number }) => (
    <input
      aria-label="Preço"
      data-testid="monetary-input"
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  ),
}))

const mockMutateAsync = vi.fn()
const mockSetOpen = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useUpdateProductMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('ProductUpdate', () => {
  const mockProduct: ProductDataModel = {
    id: '1',
    name: 'Produto Teste',
    price: 29.90
  }

  it('preenche o formulário com os dados do produto', () => {
    render(<ProductUpdate item={mockProduct} open={true} setOpen={mockSetOpen} />)

    expect(screen.getByDisplayValue('Produto Teste')).toBeInTheDocument()
    expect(screen.getByDisplayValue(29.90)).toBeInTheDocument()
  })

  it('envia o formulário com os dados atualizados', async () => {
    mockMutateAsync.mockResolvedValueOnce({})
    const user = userEvent.setup()

    render(<ProductUpdate item={mockProduct} open={true} setOpen={mockSetOpen} />)

    await user.clear(screen.getByLabelText(/nome/i))
    await user.type(screen.getByLabelText(/nome/i), 'Produto Atualizado')
    
    await user.clear(screen.getByTestId('monetary-input'))
    await user.type(screen.getByTestId('monetary-input'), '39.90')
    
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      id: '1',
      name: 'Produto Atualizado',
      price: 39.90,
    })
  })

  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()
    
    render(<ProductUpdate item={mockProduct} open={true} setOpen={mockSetOpen} />)

    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
    expect(screen.getByTestId('monetary-input')).toHaveValue(0)
  })

  it('exibe erros ao submeter sem preencher campos obrigatórios', async () => {
    const user = userEvent.setup()
    
    render(<ProductUpdate item={mockProduct} open={true} setOpen={mockSetOpen} />)

    await user.clear(screen.getByLabelText(/nome/i))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('exibe estado de carregamento durante o envio', async () => {
    vi.mocked(useUpdateProductMutation).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    } as any)

    render(<ProductUpdate item={mockProduct} open={true} setOpen={mockSetOpen} />)

    expect(screen.getByRole('button', { name: /atualizando/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /atualizando/i })).toBeDisabled()
  })
})