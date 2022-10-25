import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;

  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']}
  }
  
  body {
    background: ${(props) => props.theme['gray-900']};
    color: #fff;
    -webkit-font-smothing: antialiased;
  }

  border-style, input, textarea, button, label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
  `
