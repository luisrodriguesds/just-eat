import { render, screen } from '@testing-library/react';
import { RestaurantList } from '.';

const dataRestaurantTest = [
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
  {
    Id: 2,
    Name: 'Restaurant Test 2',
    RatingStars: 0,
    IsOpenNow: false,
    LogoUrl: 'http://fake-img.test',
    CuisineTypes: [
      {
        Id: 1,
        Name: 'CuisineTypeTest 2'
      }
    ]
  }
]

describe('RestaurantList', () => {
  it('should display correctly', () => {
    render(
      <RestaurantList 
        restaurants={dataRestaurantTest}
      />
    )
    expect(screen.getByText('Restaurant Test 1')).toBeInTheDocument()
  })
})