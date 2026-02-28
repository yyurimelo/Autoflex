
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductCreate } from '../-create'
import userEvent from '@testing-library/user-event'
import { useCreateProductMutation } from '@/http/hooks/product.hooks'

// Mocks
vi.mock('@/http/hooks/product.hooks')
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))
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

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useCreateProductMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('ProductCreate', () => {
  it('renderiza o botão de abrir', () => {
    render(<ProductCreate />)
    expect(screen.getByRole('button', { name: /criar novo/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão de criar', async () => {
    const user = userEvent.setup()

    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    expect(screen.getByText('Criar novo produto')).toBeInTheDocument()
  })



  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()
    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Produto Teste')
    await user.type(screen.getByTestId('monetary-input'), '29.90')
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
    expect(screen.getByTestId('monetary-input')).toHaveValue(0)
  })

  it('exibe erros ao submeter sem preencher', async () => {
    const user = userEvent.setup()
    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('envia o formulário com os dados preenchidos', async () => {
    mockMutateAsync.mockResolvedValueOnce({})

    const user = userEvent.setup()
    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    await user.type(screen.getByLabelText(/nome/i), 'Produto Teste')
    await user.type(screen.getByTestId('monetary-input'), '29.90')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      name: 'Produto Teste',
      price: 29.90,
    })
  })

  it('reseta o formulário após enviar com sucesso', async () => {
    mockMutateAsync.mockResolvedValueOnce({})

    const user = userEvent.setup()
    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Produto Teste')
    await user.type(screen.getByTestId('monetary-input'), '29.90')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    await screen.findByDisplayValue('')
    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
    expect(screen.getByTestId('monetary-input')).toHaveValue(0)
  })

  it('exibe mensagem de sucesso ao enviar o formulário', async () => {
    mockMutateAsync.mockResolvedValueOnce({})

    const user = userEvent.setup()
    render(<ProductCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    await user.type(screen.getByLabelText(/nome/i), 'Produto Teste')
    await user.type(screen.getByTestId('monetary-input'), '29.90')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      name: 'Produto Teste',
      price: 29.90,
    })
  })
})
