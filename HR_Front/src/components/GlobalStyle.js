import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      text-decoration: none;
      font-family: 'Prompt', sans-serif;
    }

    html {
      font-size: 16px;
      font-family: 'Prompt', sans-serif;

      @media (max-width: 1080px) {
        font-size: 90%;
      }

      @media (max-width: 720px) {
        font-size: 85%;
      }
    }

    button {
      cursor: pointer;
    }

    [disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    :root {
      --white: #FEFDFF;
      --red: #FF1747;
      --green: #04FF1D;
      --purple: #33054D;
      --purple-light: #8048CF;
      --purple-opaque: #DBB5FF;
      --gray: #8B8B8B;
      --gray-opaque: rgb(139, 139, 139, 0.5);
      --gray-light: #f2f2f2;
      --black: #180024;
      --background: #ffffff;

      --filter-purple: invert(13%) sepia(31%) saturate(5477%) hue-rotate(266deg) brightness(71%) contrast(112%);
      --filter-purple-opaque: invert(70%) sepia(13%) saturate(1712%) hue-rotate(214deg) brightness(108%) contrast(101%);
      --filter-gray: invert(63%) sepia(0%) saturate(0%) hue-rotate(165deg) brightness(88%) contrast(93%);
      --filter-white: invert(81%) sepia(5%) saturate(841%) hue-rotate(205deg) brightness(118%) contrast(105%);

      --fontsize-text: 16px;
      --fontsize-subTitle: 18px;
      --fontsize-title: 20px;
    }
`
