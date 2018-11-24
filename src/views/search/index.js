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
    this.debouncedSearch = _.debounce(this._searchMovies, 500)
  }

  state = {
    searchCache: {},
    loading: false,
    searchResults: [],
    searchTerm: '',
  }

  componentDidMount() {
    this._updateSearchResults(TRENDING_MOVIES_KEY, getTrendingMovies)
  }

  _updateSearchResults = async(key, callback) => {
    this.setState({ loading: true })
    let searchResults

    if(!key)
      searchResults = await this.props.getSearchResults(TRENDING_MOVIES_KEY, getTrendingMovies)
    else
      searchResults = await this.props.getSearchResults(key, callback)

    this.setState({ searchResults, loading: false })
  }

  _searchMovies = event => {
    const searchTerm = event.target.value.trim()
    this._updateSearchResults(searchTerm, searchMovies)
  }

  onInputChange = event => {
    event.persist()
    this.debouncedSearch(event)
  }

  renderSearchResult = (data, index) => (
    <Link to={`showcase/${data.id}`} key={index}>
      <img alt='poster' src={this.props.getPosterUrl(data.poster_path)}/>
      <p>{data.title || data.name}</p>
    </Link>
  )

  render() {
    const { searchResults, loading } = this.state

    return (
      <>
      <input 
        onChange={this.onInputChange} 
        placeholder='Search Movies'
      />

      {loading
        ? <p>loading...</p>
        : searchResults.map(this.renderSearchResult)
      }
      </>

    )
  }
}