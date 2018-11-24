import React from 'react'
import styled from 'styled-components'
import { 
  FaImdb,
  FaRegClock,
  FaStar,
} from 'react-icons/fa'

const Meta = ({ title, vote_average, runtime, imdb_id }) => (
  <Wrapper>
    <Title>{title}</Title>
    <div>
        <a 
          rel="noopener noreferrer" 
          target='_blank' 
          href={`https://www.imdb.com/title/${imdb_id}`}
        >
          <Metadata>
            <FaImdb size={20} /> &nbsp; IMDb
          </Metadata>
        </a>
      <Metadata><FaStar size={20} /> &nbsp; {((vote_average/10) * 100).toFixed(0)}%</Metadata>
      <Metadata><FaRegClock size={20} /> &nbsp; {runtime} minutes</Metadata>
    </div>
  </Wrapper>
)

const Wrapper = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Title = styled.h1``

const Metadata = styled.h5`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.fontColor.default};
`

export default Meta