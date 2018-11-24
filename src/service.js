import { defaultFetch } from './utils'

export const fetchConfig = () => {
  const path = '/configuration'

  const response = defaultFetch(path)

  return response
}