import styled from 'styled-components'

import PurpleLogo from '../../assets/img/purple-logo.png'

export const HomeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15rem;
  background-color: white;
`

export const Container = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  background-image: url(${PurpleLogo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 36rem;
  height: 22rem;
  justify-content: center;
  align-items: center;

  .home-title {
    width: 19rem;
    text-align: center;
    font-size: 3.3rem;
    font-weight: 400;
    color: var(--purple);
  }
`
