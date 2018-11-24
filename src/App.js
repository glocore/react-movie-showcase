import React, { Component } from 'react'
import { 
  BrowserRouter as Router, 
  Route 
} from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import Search from './views/search'
import Showcase from './views/showcase'
import { fetchConfig } from './service'
import { getImageUrl } from './utils'
import theme from './theme'

class App extends Component {
  state = {
    __movieCache: {},
    __searchCache: {},
    config: null,
    loading: true,
  }

  componentDidMount() {
    this._getConfig()
  }

  _getConfig = async() => {
    const response = await fetchConfig()

    if(response.error) return 
    this.setState({ config: response.data, loading: false })
  }

  _updateCache = (key, data, type) => {
    const cacheName = `__${type}Cache`

    this.setState({
      [cacheName]: {
        ...this.state[cacheName],
        [key]: data
      }
    })
  }

  _checkInCache = (key, type) =>
    this.state[`__${type}Cache`][key]
  
  getMovieInfo = async(id, callback) => {
    let movieInfo = this._checkInCache(id, 'movie')

    if(!movieInfo) {
      movieInfo = await callback()
      this._updateCache(id, movieInfo, 'movie')
    }

    return movieInfo
  }

  getSearchResults = async(keyword, callback) => {
    let results = this._checkInCache(keyword, 'search')

    if(!results) {
      results = await callback(keyword)
      this._updateCache(keyword, results, 'search')
    } 

    return results
  }

  getPosterUrl = filePath => {
    const { config } = this.state

    return getImageUrl(
      config.images.secure_base_url,
      config.images.poster_sizes[2],
      filePath
    )
  }

  getBackdropUrl = filePath => {
    const { config } = this.state

    return getImageUrl(
      config.images.secure_base_url,
      config.images.backdrop_sizes[3],
      filePath
    )
  }

  render() {
    const searchProps = {
      getSearchResults: this.getSearchResults,
      getPosterUrl: this.getPosterUrl,
    }

    const showcaseProps = {
      getMovieInfo: this.getMovieInfo,
      getPosterUrl: this.getPosterUrl,
      getBackdropUrl: this.getBackdropUrl,
    }

    return (
      <ThemeProvider theme={theme}>
        <Router>
          {this.state.loading
            ? <p>Loading...</p>
            : (        
              <div>
                <Route 
                  path="/" 
                  exact 
                  render={routeProps =>
                    <Search
                      {...routeProps}
                      {...searchProps}
                    />}
                />

                <Route 
                  path="/showcase/:id"
                  render={routeProps => 
                    <Showcase 
                      {...routeProps} 
                      {...showcaseProps}
                    />}
                />
              </div>
          )}
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
