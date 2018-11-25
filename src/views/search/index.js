import React, { Component } from 'react'
import _ from 'lodash'
import styled from 'styled-components'

import Searchbox from './components/Searchbox'
import SearchResult from './components/SearchResult'
import Loading from '../../components/Loading'
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
      searchResults = await this.props.getSearchResults(
        TRENDING_MOVIES_KEY, getTrendingMovies)
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

  renderSearchResult = (data, index) => 
    <SearchResult
      posterPath={this.props.getPosterUrl(data.poster_path)}
      title={data.title || data.name}
      path={`showcase/${data.id}`}
      key={index}
    />

  render() {
    const { searchResults, loading } = this.state

    return (
      <>
      <Searchbox onChange={this.onInputChange} />

      <ResultsWrapper>
        {loading
          ? <Loading/>
          : searchResults.map(this.renderSearchResult)
        }
      </ResultsWrapper>
      </>

    )
  }
}

const ResultsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: ${({ theme }) => theme.mediaSizes.desktop}px;
  margin: 100px auto;
  padding: 10px;
`