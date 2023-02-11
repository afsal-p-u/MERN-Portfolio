import React, { useState } from 'react'
import styled from 'styled-components'

import {
    GitHub,
    LinkedIn,
    Menu,
    Close
} from '@mui/icons-material'

const Container = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: ${props => props.scroll >= 60 ? '#2d2846' : '#5a5aa1'}; 
    height: 9vh;
    position: sticky;
    top: 0;
    transition: all 1000ms ease;
    z-index: 999999;
`
const Left = styled.div`
    flex: 1;
`
const Name = styled.h1`
    padding-left: 30px;
    color: #eee;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    & .menu-btn,
    & .close-btn {
        display: none;
        position: block;
        padding-right: 25px; 
        font-size: 28px;
        color: #eee;
        cursor: pointer;
        z-index: 200;

        @media screen and (max-width: 768px){
            display: block;
        }
    }
`
const RightLeft = styled.div`
    flex: 1;
`
const UL = styled.ul`
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 768px){
        position: fixed;
        flex-direction: column; 
        background: var(--color-primary);
        top: 70px;
        right: 20px;
        padding: 40px 10px;
        border-radius: 6px;
        align-items: center;
        justify-content: center;
        display: none;

        &.change {
            display: flex;
        }
    }
`
const LI = styled.li`
    margin-right: 5px;

    @media screen and (max-width: 768px){
        padding: 5px 0;
    }
`
const A = styled.a`
    font-size: 17px;
    padding: 0 8px;
    cursor: pointer;
    font-weight: 600;
    border-radius: 6px;
    color: #eee;

    &:hover, &.active {
        color: #140e1a;
        background: #eee;
    }
`
const RightRight = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SocialMedia = styled.ul`
    display: flex;
`
const AccountLink = styled.li`
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const Redirect = styled.a`
    display: flex;

    & .social {
        color: #eee;
    }
`

const Navbar = (props) => {

    const [activeNav, setActiveNav] = useState('#')
    const [show, setShow] = useState(false)

    const ToggleMenu = () => {
        document.querySelector('.lists').classList.toggle('change')
        if(show == false){
            setShow(true)
        }else{
            setShow(false)
        }
    }

  return (
    <Container scroll={props.scroll}>
        <Left>
            <Name>Afsal</Name>
        </Left>
        <Right>
            <RightLeft>
                <UL className='lists'>
                    <LI><A 
                            href="#home" 
                            onClick={() => setActiveNav('#home')} 
                            className={activeNav == '#home' ? "active" : ""}
                        >Home</A>
                    </LI>
                    <LI><A 
                            href="#about"
                            onClick={() => setActiveNav('#about')} 
                            className={activeNav == '#about' ? "active" : ""}
                        >About</A>
                    </LI>
                    <LI><A 
                            href="#education" 
                            onClick={() => setActiveNav('#education')} 
                            className={activeNav == '#education' ? "active" : ""}
                        >Education</A>
                    </LI>
                    <LI><A 
                            href="#skills"
                            onClick={() => setActiveNav('#skills')} 
                            className={activeNav == '#skills' ? "active" : ""} 
                        >Skills</A>
                    </LI>
                    <LI><A 
                            href="#projects"
                            onClick={() => setActiveNav('#projects')} 
                            className={activeNav == '#projects' ? "active" : ""} 
                        >Projects</A>
                    </LI>
                    <LI><A 
                            href="#contact" 
                            onClick={() => setActiveNav('#contact')} 
                            className={activeNav == '#contact' ? "active" : ""}
                        >Contact</A>
                    </LI>
                </UL>
            </RightLeft>
            <RightRight>
                <SocialMedia>
                    <AccountLink><Redirect href="https://github.com/afsal-p-u" ><GitHub className='social'/></Redirect></AccountLink>
                    <AccountLink><Redirect href="https://www.linkedin.com/in/afsal-p-u/" ><LinkedIn className='social'/></Redirect></AccountLink>
                </SocialMedia>
            </RightRight>
            {show == true ? (
                    <Close className='close-btn' onClick={ToggleMenu}/>
                ) : (
                    <Menu className="menu-btn" onClick={ToggleMenu} />
                )}
        </Right>
    </Container>
  )
}

export default Navbar