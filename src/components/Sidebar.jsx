import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: sticky;
    top: 9vh;
    min-width: 200px;
    height: 91vh;
    background: var(--bg-primary);
    box-sizing: border-box;
    padding: 20px;

    @media screen and (max-width: 768px){
        min-width: 130px;
    }
    @media screen and (max-width: 576px){
        display: none;
    }
`
const NavUL = styled.ul`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 10px;
`
const NavLI = styled.li`
    font-weight: 600;
    font-size: 15px;
    box-sizing: border-box;
    padding: 2px 0;
    margin: 3px 0;
    background: var(--bg-secondary);
    display: flex;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
`

const Sidebar = () => {
  return (
    <Container>
        <NavUL>
            <NavLI><Link to ="/" style={{color: '#eee'}}>Admin</Link></NavLI>
            <NavLI><Link to='/skills' style={{color: '#eee'}}>Skills</Link></NavLI>
            <NavLI><Link to='/projects' style={{color: '#eee'}}>Projects</Link></NavLI>
        </NavUL>
    </Container>
  )
}

export default Sidebar