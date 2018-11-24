import React from 'react'
import styled from 'styled-components'

import { numberWithCommas } from '../../../utils'

const Synopsis = ({ 
  budget,
  genreNames, 
  overview, 
  prodCoNames,
  revenue,
}) => (
  <Wrapper>
    <Overview>{overview}</Overview>
    <Genres>{genreNames.join(', ')}</Genres>
    {!!prodCoNames.length && <h4>Production Companies:</h4>}
    <ProdCoNames>{prodCoNames.join(' | ')}</ProdCoNames>
    {!!budget && <Overview>Budget: ${numberWithCommas(budget)}</Overview>}
    {!!revenue && <Overview>Revenue: ${numberWithCommas(revenue)}</Overview>}
  </Wrapper>
)

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  max-width: ${({ theme }) => theme.mediaSizes.desktop}px;
`

const Overview = styled.h4``

const Genres = styled.em``

const ProdCoNames = styled.p``

export default Synopsis