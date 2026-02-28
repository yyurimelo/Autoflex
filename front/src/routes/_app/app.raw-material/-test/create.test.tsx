import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useCreateRawMaterialMutation } from '@/http/hooks/raw-material.hooks'
import { RawMaterialCreate } from '../-create'

vi.mock('@/http/hooks/raw-material.hooks')
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}))

const mockMutateAsync = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useCreateRawMaterialMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('RawMaterialCreate', () => {
  it('renderiza o botão de abrir', () => {
    render(<RawMaterialCreate />)
    expect(screen.getByRole('button', { name: /criar novo/i })).toBeInTheDocument()
  })

  it('abre o sheet ao clicar no botão', async () => {
    const user = userEvent.setup()
    render(<RawMaterialCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))

    expect(screen.getByText('Criar nova matéria-prima')).toBeInTheDocument()
  })

  it('exibe erros ao submeter sem preencher', async () => {
    const user = userEvent.setup()
    render(<RawMaterialCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument()
    expect(await screen.findByText('Informe uma quantidade válida')).toBeInTheDocument()
  })

  it('envia o formulário com os dados preenchidos', async () => {
    mockMutateAsync.mockResolvedValueOnce({})
    const user = userEvent.setup()
    render(<RawMaterialCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Farinha de Trigo')
    await user.type(screen.getByLabelText(/quantidade em estoque/i), '100')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      name: 'Farinha de Trigo',
      stockQuantity: 100,
    })
  })

  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()
    render(<RawMaterialCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Farinha de Trigo')
    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
  })

  it('reseta o formulário após enviar com sucesso', async () => {
    mockMutateAsync.mockResolvedValueOnce({})
    const user = userEvent.setup()
    render(<RawMaterialCreate />)

    await user.click(screen.getByRole('button', { name: /criar novo/i }))
    await user.type(screen.getByLabelText(/nome/i), 'Farinha de Trigo')
    await user.type(screen.getByLabelText(/quantidade em estoque/i), '100')
    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    await screen.findByDisplayValue('')
    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
  })
})