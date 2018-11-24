export const defaultFetch = async(path, query, options) => {
  const url = 
  process.env.REACT_APP_BASE_URL + 
  path + 
  '?api_key=' + 
  process.env.REACT_APP_API_KEY +
  (query ? serialize(query) : '')

  try {
    const response = await fetch(url, options)

    const responseJson = await response.json()
    if(!response.ok) throw responseJson
    
    return { error: null, data: responseJson }

  } catch(err) {
    // console.warn('Error fetching from path', path, err)
    return { error: err, data: null }
  }
}

export const serialize = obj => {
  var str = []
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  return `&${str.join("&")}`
}

export const getImageUrl = (baseUrl, size, filePath) => {
  if(!baseUrl || !size || !filePath) return null

  const path = baseUrl + size + filePath

  return path
}