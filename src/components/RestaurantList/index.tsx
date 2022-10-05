import { IRestaurant } from '../../interface/IRestaurant'
import './styles.css'

interface RestaurantListProps {
 restaurants: IRestaurant[]
}

export function RestaurantList({ restaurants }: RestaurantListProps){
  return (
    <div id="restaurant-list">
      {restaurants.map(restaurant => (
        <div className="item" key={restaurant.Id}>
          <img src={restaurant.LogoUrl} alt="restaurant-logo" />
          <div className="item-options">
            <div className="title">
              <h2>{restaurant.Name}</h2>
            </div>
            <div className="rating">
              {Array.from(Array(~~restaurant.RatingStars).keys()).map(rating => (
                <img src="icons/star.png" alt="star" key={`start-${rating}`} />
              ))}
              <span>{restaurant.RatingStars ? `(${restaurant.RatingStars})` : ''}</span>
            </div>
            <div className="food-types">
              {restaurant.CuisineTypes.map(cuisine => (
                <span key={cuisine.Id}>{cuisine.Name}</span>
              ))}
            </div>
          </div>
          <div className="isOpen">
            <span data-isopen={`${restaurant.IsOpenNow}`}>{restaurant.IsOpenNow ? 'Open' : 'Closed'}</span>
          </div>
        </div>
      ))}
    </div>
  )
}