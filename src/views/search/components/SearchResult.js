import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SearchResult = ({ posterPath, title, path }) => (
  <Wrapper to={path}>
    <Poster alt={`${title} poster`} src={posterPath}/>
    <Title>{title}</Title>
  </Wrapper>
)

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  box-sizing: border-box;
  width: 25%;
  ${({ theme }) => theme.media.tablet`width: 33.33%;`}
  ${({ theme }) => theme.media.phone`width: 50%;`}
  transition: background 0.2s ease-in;
  &: hover {
    background-color: #444444;
  }
`

const Poster = styled.div`
  width: 100%;
  height: 300px;
  ${({ theme }) => theme.media.phone`height: 250px;`}
  background-image: url('${({ src }) => src}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #222222;
`

const Title = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.fontColor.default};
`

export default SearchResult