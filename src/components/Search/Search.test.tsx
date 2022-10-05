import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from '.';

describe('Search', () => {
  it('should display correctly', () => {
    render(
      <Search
        onChangeForm={() => {}}
        onSubmitForm={() => {}}
      />
    )
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('should change the value correctly', () => {
    const mockOnChangeForm = jest.fn()
    render(
      <Search
        placeholder='placeholder-input'
        onChangeForm={mockOnChangeForm}
        onSubmitForm={() => {}}
      />
    )
    const inputText = screen.getByPlaceholderText('placeholder-input')
    fireEvent.change(inputText, {
      target: {
        value: 'outcode-test'
      }
    })

    expect(mockOnChangeForm).toBeCalled()
  })

  it('should submit correctly', () => {
    const mockOnSubmitForm = jest.fn()
    const mockOnChangeForm = jest.fn()
    render(
      <Search
        onChangeForm={mockOnChangeForm}
        onSubmitForm={mockOnSubmitForm}
      />
    )

    fireEvent.click(screen.getByText('Search'))
    
    expect(mockOnSubmitForm).toBeCalled()
  })
})