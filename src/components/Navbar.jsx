import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 9vh;
    background: var(--bg-primary);
    display: flex;
    align-items: center;  
`
const Left = styled.div`
    flex: 1;
    padding-left: 30px;
    font-size: 23px;
    font-weight: 600;
    color: var(--color-primary);

    @media (max-width: 576px){
        font-size: 17px;
        padding-left: 5px;
    }
`
const Center = styled.div`
    flex: 1;
    text-align: center;
    font-size: 23px;
    font-weight: 600;
    color: var(--color-primary);

    @media (max-width: 576px){
        display: none;
    }
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;

    @media (max-width: 576px){
        padding-right: 5px;
    }
`
const Button = styled.button`
    padding: 5px 15px;
    outline: none;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    margin-right: 15px;
    cursor: pointer;

    &:hover {
        background: var(--btn-primary);
        color: var(--color-primary);
    }
    @media (max-width: 576px){
        padding: 2px 10px;
    }
`

const Navbar = ({title, newAdmin}) => {
  return (
    <Container>
        <Left>Admin Panel</Left>
        <Center>{title}</Center>
        <Right>
            {title == 'Admin' && (
                <Button onClick={()=> {
                    newAdmin(true)
                }}>Add New</Button>
            )}
            <Button>Logout</Button>
        </Right>
    </Container>
  )
}

export default Navbar