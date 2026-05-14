import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['nebula-purple']};
  }

  body {
    background: ${(props) => props.theme['space-void']};
    color: ${(props) => props.theme['text-primary']};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  input, textarea, button, label {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  /* Subtle static starfield */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(1px 1px at 5% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 18% 28%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 32% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 48% 8%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 63% 72%, rgba(255,255,255,0.5) 0%, transparent 100%),
      radial-gradient(1px 1px at 77% 38%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 88% 15%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 94% 85%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(1px 1px at 25% 90%, rgba(255,255,255,0.4) 0%, transparent 100%),
      radial-gradient(1px 1px at 70% 95%, rgba(255,255,255,0.3) 0%, transparent 100%),
      radial-gradient(2px 2px at 12% 60%, rgba(192,132,252,0.6) 0%, transparent 100%),
      radial-gradient(2px 2px at 55% 35%, rgba(96,165,250,0.5) 0%, transparent 100%),
      radial-gradient(2px 2px at 82% 58%, rgba(251,191,36,0.5) 0%, transparent 100%),
      radial-gradient(2px 2px at 38% 78%, rgba(34,211,238,0.4) 0%, transparent 100%),
      radial-gradient(3px 3px at 90% 30%, rgba(255,255,255,0.6) 0%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  #root {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme['space-deep']};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['nebula-purple']};
    border-radius: 3px;
  }
`
