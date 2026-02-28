import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { useUpdateRawMaterialMutation } from '@/http/hooks/raw-material.hooks'
import { RawMaterialUpdate } from '../-update'
import type { RawMaterialDataModel } from '@/@types/raw-material/RawMaterialDataModel'

vi.mock('@/http/hooks/raw-material.hooks')

const mockMutateAsync = vi.fn()
const mockSetOpen = vi.fn()

const mockItem: RawMaterialDataModel = {
  id: "1",
  name: 'Farinha de Trigo',
  stockQuantity: 50,
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useUpdateRawMaterialMutation).mockReturnValue({
    mutateAsync: mockMutateAsync,
    isPending: false,
  } as any)
})

describe('RawMaterialUpdate', () => {
  it('renderiza o formulário quando open=true', () => {
    render(<RawMaterialUpdate open={true} setOpen={mockSetOpen} item={mockItem} />)

    expect(screen.getByText('Atualizar matéria-prima')).toBeInTheDocument()
  })

  it('preenche os campos com os dados do item', () => {
    render(<RawMaterialUpdate open={true} setOpen={mockSetOpen} item={mockItem} />)

    expect(screen.getByLabelText(/nome/i)).toHaveValue('Farinha de Trigo')
    expect(screen.getByLabelText(/quantidade em estoque/i)).toHaveValue(50)
  })

  it('envia o formulário com os dados atualizados', async () => {
    mockMutateAsync.mockResolvedValueOnce({})
    const user = userEvent.setup()

    render(<RawMaterialUpdate open={true} setOpen={mockSetOpen} item={mockItem} />)

    await user.clear(screen.getByLabelText(/nome/i))
    await user.type(screen.getByLabelText(/nome/i), 'Farinha Integral')

    await user.clear(screen.getByLabelText(/quantidade em estoque/i))
    await user.type(screen.getByLabelText(/quantidade em estoque/i), '80')

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(mockMutateAsync).toHaveBeenCalledWith({
      id: "1",
      name: 'Farinha Integral',
      stockQuantity: 80,
    })
  })

  it('limpa os campos ao clicar em limpar', async () => {
    const user = userEvent.setup()
    render(<RawMaterialUpdate open={true} setOpen={mockSetOpen} item={mockItem} />)

    await user.click(screen.getByRole('button', { name: /limpar/i }))

    expect(screen.getByLabelText(/nome/i)).toHaveValue('')
    expect(screen.getByLabelText(/quantidade em estoque/i)).toHaveValue(0)
  })

  it('exibe erros ao submeter sem preencher campos obrigatórios', async () => {
    const user = userEvent.setup()
    render(<RawMaterialUpdate open={true} setOpen={mockSetOpen} item={undefined} />)

    await user.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(await screen.findByText('Campo obrigatório')).toBeInTheDocument()
    expect(await screen.findByText('Informe uma quantidade válida')).toBeInTheDocument()
  })
})