import { defaultFetch } from 'utils'

export const fetchMovieInfo = async(movie_id) => {
  const path = `/movie/${movie_id}`

  const response = await defaultFetch(path)

  return response
}