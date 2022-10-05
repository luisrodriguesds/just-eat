export interface IRestaurant {
  Id: number
  Name: string
  CuisineTypes: {
    Id: number
    Name: string
  }[]
  IsOpenNow: boolean
  LogoUrl: string
  RatingStars: number
}