import { css } from 'styled-components'

const fontColor = {
  default: 'white'
}

const mediaSizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

const fontSize = {
  main: '1rem',
  huge: '3rem',
  large: '2rem',
  fine: '0.75rem',
}

const media = Object.keys(mediaSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${mediaSizes[label] / 16}em) {
      ${css(...args)};
    }
  `

  return acc
}, {})

export default {
  fontColor,
  fontSize,
  media,
  mediaSizes,
}