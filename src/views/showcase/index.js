import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

import Meta from './components/Meta'
import Synopsis from './components/Synopsis'
import Loading from '../../components/Loading'
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
      budget,
      genres,
      imdb_id,
      overview,
      poster_path,
      production_companies,
      revenue,
      runtime,
      vote_average,
      title,
    } = this.state.movieInfo

    const genreNames = genres.map(g => g.name)
    const prodCoNames = production_companies.map(c => c.name)

    return this.state.error
    ? <Redirect to='/'/>
    : (
      <PageWrapper>
        <Backdrop 
          alt={`${title} backdrop`} 
          src={this.props.getBackdropUrl(backdrop_path)}
        />
        <Head>
          <Poster 
            alt={`${title} poster`} 
            src={this.props.getPosterUrl(poster_path)}
          />
          <Meta {...{
            imdb_id,
            runtime,
            title,
            vote_average,
          }} />
        </Head>

        <Synopsis
          {...{
            budget,
            genreNames,
            overview,
            prodCoNames,
            revenue,
          }}
        />
      </PageWrapper>
    )
  }

  render() {
    return (
      <>
        <Close/>
        {!!this.state.loading
          ? <Loading/>
          : this._renderMovieInfo()
        }
      </>
    )
  }
}

const Close = () => (
  <CloseButton>
    <Link to='/'>
      <FaTimes color='white' size={30}/>
    </Link>
  </CloseButton>
)

const CloseButton = styled.div`
  margin: 20px;
`

const PageWrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.fontColor.default};
`

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background-image: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #222222;
  opacity: 0.3;
`

const Head = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${({ theme }) => theme.mediaSizes.desktop}px;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
`

const Poster = styled.img``
