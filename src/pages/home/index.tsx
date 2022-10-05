import { FormEvent, useState } from 'react'
import { RestaurantList } from '../../components/RestaurantList'
import { Search } from '../../components/Search'
import { IRestaurant } from '../../interface/IRestaurant'
import { getRestaurantsByPost } from '../../services/api'
import './styles.css'

export function Home(){
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!search) {
      return
    }
    setLoading(true)
    setNotFound(false)
    try {
      const res = await getRestaurantsByPost(search)
      const filterResult = res.data?.Restaurants?.filter((item: IRestaurant) => item.IsOpenNow) || []
      setNotFound(!filterResult.length)
      setRestaurants(filterResult)
    } catch (err) {
      alert('Something when wrong, please try again later...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='home'>
      <div className='home-title'>
        <h1>Just Eat</h1>
      </div>
      <Search 
        placeholder='Search for restaurants by outcode ...' 
        onSubmitForm={handleSubmit} 
        onChangeForm={(e) => setSearch(e.target.value)} 
      />
      {loading && (
        <h3>Loading ...</h3>
      )}
      {notFound && (
        <h3>Results not found.</h3>
      )}
      <RestaurantList restaurants={restaurants} />
    </div>
  )
}