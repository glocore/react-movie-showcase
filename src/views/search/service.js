import { defaultFetch } from 'utils'

export const getTrendingMovies = async() => {
  const path = '/trending/movie/week'
  
  const response = await defaultFetch(path)

  if(response.error) return null

  return response.data.results
}

export const searchMovies = async(keyword) => {
  const path = `/search/movie`
  const query = {
    query: keyword,
    page: 1,
  }

  const response = await defaultFetch(path, query)

  if(response.error) return null

  return response.data.results
}