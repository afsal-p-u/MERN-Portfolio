import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import 'material-icons/iconfont/material-icons.css';
import MainImg from '../assets/main-image.png'

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    background: #5a5aa1;
    box-sizing: border-box;
    min-height: 91vh;  
    padding: 50px;

    @media screen and (max-width: 576px){
        padding: 20px;  
    }
`
const Left = styled.div`
    flex: 1;
    min-width: 300px;
    display: flex; 
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 768px){
        width: 100%;   
    }
    @media screen and (max-width: 576px){
        align-items: center;  
    }
`
const Title = styled.h3`
    font-size: 30px;
    color: #0f254c;
`
const Name = styled.h1`
    font-size: 60px;
    font-weight: 600;

    @media screen and (max-width: 992px){
        font-size: 45px; 
    }
`
const Slider = styled.div`
    margin: 10px 0;
    width: 300px;
    height: 8vh;
    display: flex;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`
const Content = styled.div`
    min-width: 100%;
    min-height: 100%;
    display: flex; 
    align-items: center;
    justify-content: center;
`
const H1 = styled.div `
    color: #fff;
    font-size: 25px;
    font-weight: 600;
`
const P = styled.p`
    font-weight: 600;
    @media screen and (max-width: 576px){
        text-align: center;
    }
`
const Buttons = styled.div`
    margin-top: 25px;

    @media screen and (max-width: 768px){
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    @media screen and (max-width: 576px){
        width: 100%;
        justify-content: center;
        gap: 1.5rem;
    }
`
const Button = styled.button`
    margin-right: 20px;
    padding: 15px;
    border-radius: 8px;
    outline: none;
    border: none;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    background-color: #0f254c;
    color: #fff;  

    &:hover {
        background: black;
    }

    @media screen and (max-width: 576px){
        margin-right: 0;
    }
`
const A = styled.a`
    color: #fff; 
`
const Right = styled.div`
    flex; 1;
    max-width: 50%;
    min-width: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    jutify-content: center;

    @media screen and (max-width: 768px){
        max-width: 100%;
        margin-top: 2rem;
    }
`
const Img = styled.img`
    width: 100%;
    margin: 0 auto;
`

const Main = () => {

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);

  return (
    <Container id="home">
        <Left>
            <Title>Hello World</Title>
            <Name>I'm AFSAL P U</Name>
            <Slider>
                <Content>
                    <H1>Web Developer</H1>
                </Content>
                <Content>
                    <H1>Frond-End-Developer</H1>
                </Content>
                <Content>
                    <H1>Back-End-Developer</H1>
                </Content>
                <Content>
                    <H1>Full-Stack-Developer</H1>
                </Content>
            </Slider>
            <P>Highly motivated and detail-oriented computer science graduate with a passion for technology and problem solving</P>
            <Buttons>
                <Button><A href="#contact">Hire Me</A></Button>
                <Button>Download Resume</Button>
            </Buttons>
        </Left>
        <Right>
            <Img src={MainImg} alt="" />
        </Right>
    </Container>
  )
}

export default Main