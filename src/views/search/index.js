import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import { 
  getTrendingMovies,
  searchMovies,
} from './service'

const TRENDING_MOVIES_KEY = '__trending'

export default class Search extends Component {
  constructor() {
    super()
    this.debouncedSearch = _.debounce(this.searchMovies, 500)
  }

  state = {
    searchCache: {},
    loadingResults: false,
    searchResults: [],
    searchTerm: '',
  }

  componentDidMount() {
    this._getTrendingMovies()
  }

  _getTrendingMovies = async() => {
    this.updateSearchResults(TRENDING_MOVIES_KEY, getTrendingMovies)
  }

  checkInCache = searchTerm =>
    this.state.searchCache[searchTerm]
  
  updateSearchResults = async(searchTerm, callback) => {
    if(searchTerm === '') {
      this.setState({
        searchResults: this.checkInCache(TRENDING_MOVIES_KEY)
      })

      return
    }

    let searchResults = this.checkInCache(searchTerm)

    if(!searchResults) {
      this.setState({ loadingResults: true })
      
      searchResults = await callback(searchTerm)

      if(!searchResults) {
        this.setState({ loadingResults: false })
        return
      }

      this.setState({
        searchCache: {
          ...this.state.searchCache,
          [searchTerm]: searchResults
        }
      })
    }

    this.setState({ loadingResults: false, searchResults })
  }

  searchMovies = event => {
    const searchTerm = event.target.value
    this.updateSearchResults(searchTerm, searchMovies)
  }

  onInputChange = event => {
    event.persist()
    this.debouncedSearch(event)
  }

  renderSearchResult = (data, index) => (
    <Link to={`showcase/${data.id}`} key={index}>
      <p>{data.title || data.name}</p>
    </Link>
  )

  render() {
    const { searchResults, loadingResults } = this.state

    return (
      <>
      <input 
        onChange={this.onInputChange} 
        placeholder='Search Movies'
      />

      {loadingResults
        ? <p>loading...</p>
        : searchResults.map(this.renderSearchResult)
      }
      </>

    )
  }
}