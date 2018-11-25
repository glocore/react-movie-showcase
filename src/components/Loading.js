import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

const Loading = () => (
  <Wrapper>
    <Loader 
      type="Triangle"
      color="#FFFFFF"
      height="100"	
      width="100"
    />
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100vw;
  height: 75vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Loading