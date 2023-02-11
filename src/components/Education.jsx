import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    background: #5a5aa1;
`
const Title = styled.h1`
    text-align: center;
    padding-top: 9vh;
    color: #eee;
`
const Row = styled.div`
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Info = styled.div`
    background: var(--color-primary);
    width: 100%;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    border-radius: 8px;
`
const Small = styled.small`
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: var(--bg-primary);
    color: #fff;
    letter-spacing: 2px;
    font-weight: 600;
`
    const H2 = styled.h2`
    letter-spacing: 2px;
    margin: 6px;
    color: #eee;
`
const Desc = styled.p`
    color: gray;
    font-weight: 500;
    font-size: 12px;
    padding: 5px;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Education = () => {
  return (
      <Container id='education'>
        <Title>Education</Title>
      <Row>
        <Left>
            <Info>
                <Small>Degree</Small>
                <H2>Yenepoya University</H2>
                <Desc>2020-2023</Desc>
            </Info>
        </Left>
        <Center>
            <Info>
                <Small>PUC</Small> 
                <H2>IJM HSS</H2>
                <Desc>2018-2020</Desc>
            </Info>
        </Center>
        <Right>
            <Info>
                <Small>SSLC</Small> 
                <H2>St. Joseph's HS</H2>
                <Desc>2015-2018</Desc>
            </Info>
        </Right>
      </Row>
    </Container>
  )
}

export default Education
