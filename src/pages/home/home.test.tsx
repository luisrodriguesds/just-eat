import { fireEvent, render, screen, act } from '@testing-library/react';
import { Home } from '.';
import * as getRestaurantsByPost from '../../services/api';

const wait = (amount = 0) => {
  return new Promise((resolve) => setTimeout(resolve, amount));
};

const actWait = async (amount = 0) => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    await wait(amount);
  });
};
const dataRestaurantEmpty = {
  data: {}
}
const dataRestaurantSuccess = {
  data: {
    Restaurants: [
      {
        Id: 1,
        Name: 'Restaurant Test 1',
        RatingStars: 4.5,
        IsOpenNow: true,
        LogoUrl: 'http://fake-img.test',
        CuisineTypes: [
          {
            Id: 1,
            Name: 'CuisineTypeTest 1'
          }
        ]
      },
    ]
  }
}

describe('Home', () => {
  it('should display correctly', () => {
    render(
      <Home />
    )
    expect(screen.getByText('Just Eat')).toBeInTheDocument()
  })

  it('should search correctly', async () => {
    jest.spyOn(getRestaurantsByPost, 'getRestaurantsByPost').mockReturnValue(dataRestaurantSuccess as any)
    render(
      <Home />
    )
    
    const inputText = screen.getByPlaceholderText('Search for restaurants by outcode ...')
    fireEvent.change(inputText, {
      target: {
        value: 'outcode-test'
      }
    })

    expect(screen.getByDisplayValue('outcode-test')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('Search'))
    
    await actWait(500)

    expect(screen.getByText('Restaurant Test 1')).toBeInTheDocument()
  })

  it('should not search with a empty value', async () => {
    render(
      <Home />
    )
    fireEvent.click(screen.getByText('Search'))
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should display "not found" message', async () => {
    jest.spyOn(getRestaurantsByPost, 'getRestaurantsByPost').mockReturnValue(dataRestaurantEmpty as any)
    render(
      <Home />
    )
    
    const inputText = screen.getByPlaceholderText('Search for restaurants by outcode ...')
    fireEvent.change(inputText, {
      target: {
        value: 'outcode-test'
      }
    })

    fireEvent.click(screen.getByText('Search'))

    await actWait(500)

    expect(screen.getByText('Results not found.')).toBeInTheDocument()
  })

  it('should display an alert message when the API fails', async () => {
    jest.spyOn(getRestaurantsByPost, 'getRestaurantsByPost').mockRejectedValue(() => {})
    window.alert = jest.fn();
    render(
      <Home />
    )

    const inputText = screen.getByPlaceholderText('Search for restaurants by outcode ...')
    fireEvent.change(inputText, {
      target: {
        value: 'outcode-test'
      }
    })

    fireEvent.click(screen.getByText('Search'))
    
    await actWait(500)
    expect(window.alert).toBeCalled()
  })
})