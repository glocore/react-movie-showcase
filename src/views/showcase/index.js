import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
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

  _renderMovieInfo = () => {
    const {
      backdrop_path,
      genres,
      overview,
      poster_path,
      title,
    } = this.state.movieInfo

    return this.state.error
    ? <Redirect to='/'/>
    : (
      <>
        <img 
          alt={`${title} poster`} 
          src={this.props.getPosterUrl(poster_path)}
        />
        <img 
          alt={`${title} backdrop`} 
          src={this.props.getBackdropUrl(backdrop_path)}
        />
        <h1>{title}</h1>
        <p>{overview}</p>
        {genres.map((genre, index) => 
          (<span key={index}>{genre.name}, </span>))}
      </>
    )
  }

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