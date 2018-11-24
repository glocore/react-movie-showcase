import React from 'react'
import styled from 'styled-components'

const Searchbox = ({ onChange }) => (
  <Wrapper>
    <StyledSearchbox
      onChange={onChange}
      placeholder='Search Movies...'
    />
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  background-color: black;
`

const StyledSearchbox = styled.input`
  width: 100%;
  max-width: ${({ theme }) => theme.mediaSizes.desktop}px;  
  height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 20px;
  background-color: #555555;
  border: none;
  border-radius: 5px;
  color: white;
`

export default Searchbox