import axios from "axios"
const URL_BASE = 'http://localhost:5000/api/'
export const api = axios.create({
  baseURL: URL_BASE
})

export const getRestaurantsByPost = async (outcode: string) => {
  return api.get(`/bypostcode/${outcode}`)
}