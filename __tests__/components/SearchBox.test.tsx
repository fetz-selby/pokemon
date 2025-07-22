import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBox from '../../components/SearchBox/SearchBox'
import React from 'react'

describe('SearchBox', () => {
  const mockOptions = ['Pikachu', 'Bulbasaur', 'Charmander', 'Squirtle']
  const mockOnSelect = vi.fn()

  beforeEach(() => {
    mockOnSelect.mockClear()
  })

  it('displays dropdown when input is focused', async () => {
    const user = userEvent.setup()
    render(<SearchBox options={mockOptions} onSelect={mockOnSelect} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    // Check if options are displayed
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
  })

  it('filters options based on input value', async () => {
    const user = userEvent.setup()
    render(<SearchBox options={mockOptions} onSelect={mockOnSelect} />)

    const input = screen.getByRole('combobox')
    await user.type(input, 'Pika')

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
  })

  it('calls onSelect when an option is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBox options={mockOptions} onSelect={mockOnSelect} />)

    const input = screen.getByRole('combobox')
    await user.click(input)

    const option = screen.getByText('Pikachu')
    await user.click(option)

    expect(mockOnSelect).toHaveBeenCalledWith('Pikachu')
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it('hides dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <SearchBox options={mockOptions} onSelect={mockOnSelect} />
        <button>Outside element</button>
      </div>
    )

    const input = screen.getByRole('combobox')
    await user.click(input)

    // Dropdown should be visible
    expect(screen.getByText('Pikachu')).toBeInTheDocument()

    // Click outside
    const outsideButton = screen.getByText('Outside element')
    await user.click(outsideButton)

    // Dropdown should be hidden
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument()
  })

  it('handles empty options array', () => {
    render(<SearchBox options={[]} onSelect={mockOnSelect} />)

    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
  })

  it('clears input when an option is selected', async () => {
    const user = userEvent.setup()
    render(<SearchBox options={mockOptions} onSelect={mockOnSelect} />)

    const input = screen.getByRole('combobox')
    await user.type(input, 'Pika')
    await user.click(screen.getByText('Pikachu'))

    expect(input).toHaveValue('Pikachu')
  })
})
