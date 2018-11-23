import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovieInfo } from './service'

export default class Showcase extends Component {
  state = {
    loading: true,
    error: false,
    movieInfo: {},
  }
  componentDidMount() {
    this._setMovieInfo()
  }

  _setMovieInfo = async() => {
    const { match, getMovieInfo } = this.props
    const { id } = match.params
    const callback = () => fetchMovieInfo(match.params.id)

    const response = await getMovieInfo(id, callback)

    if(response.error)
      this.setState({ error: true })
    else
      this.setState({ movieInfo: response.data })
    
    this.setState({ loading: false })
    return
  }

  _renderMovieInfo = () => this.state.error
    ? <h1>Error</h1>
    : (
      <>
        <img alt={`${this.state.movieInfo.title} poster`} src={`http://image.tmdb.org/t/p/w185${this.state.movieInfo.poster_path}`}/>
        <h1>{this.state.movieInfo.title}</h1>
        <p>{this.state.movieInfo.overview}</p>
        {this.state.movieInfo.genres.map((genre, index) => 
          (<span key={index}>{genre.name}, </span>))}
      </>
    )

  render() {
    return (
      <>
        <Link to='/'>Close</Link>
        {!!this.state.loading
          ? <p>Loading...</p>
          : this._renderMovieInfo()
        }
      </>
    )
  }
}