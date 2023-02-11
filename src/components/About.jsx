import React from 'react'
import styled from 'styled-components'

import Image1 from '../assets/about1.png'
import Image2 from '../assets/about2.png'

const Container = styled.div`
  width: 100%;
  background: #3d3d5c;
`
const Title = styled.h1`
  text-align: center;
  color: #eee;
  padding-top: 9vh;
`
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;  
  box-sizing: border-box;
  padding: 50px;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media screen and (max-width: 576px){
    flex-direction: column;
  }
`
const Left = styled.div`
  min-width: 250px;
  flex: 2;

  @media screen and (max-width: 992px){
    min-width: 100%;
    margin-bottom: 3em;
  }
  @media screen and (max-width: 768px){
    min-width: 100%;
    margin-bottom: 3em;
  }
  @media screen and (max-width: 576px){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
const H2 = styled.h2`
  color: #fff;
  font-size: 35px;
  font-weight: 600;

  @media screen and (max-width: 576px){
    color: #000;
  }
`
const P = styled.p`
  font-size: 16px;
  color: #eee;

  @media screen and (max-width: 576px){
    text-align: center;
  }
`
const Center = styled.div`
  flex: 1;
  min-width: 280px;
  object-fit: cover;
  background: #c7c2c2;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px){
    min-width: 25%;
  }
  @media screen and (max-width: 576x){
  }
`
const Img1 = styled.img`
  width: 100%;
`
const Desc = styled.h3`
  margin-top: 15px;
  color: gray;
`
const Right = styled.div`
  flex: 1;
  min-width: 280px;
  object-fit: cover; 
  padding: 15px;
  background: #c7c2c2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px){
    min-width: 25%;
  }
  @media screen and (max-width: 576x){
    min-width: 100%;
  }
`
const Img2 = styled.img`
  width: 100%;
`

const About = () => {

  return (
    <Container id="about" >
      <Title>About</Title>
      <Row>
        <Left>
          <H2>Afsal</H2>
          <P>Seeking an entry-level position where i can apply my skills, knowledge, and drive to make a positive impact</P>
        </Left>
        <Center>
          <Img1 src={Image1} ></Img1>
          <Desc>Web Development</Desc>
        </Center>
        <Right>
          <Img2 src={Image2} ></Img2>
          <Desc>Web Designing</Desc>
        </Right>
      </Row>
    </Container>
  )
}

export default About