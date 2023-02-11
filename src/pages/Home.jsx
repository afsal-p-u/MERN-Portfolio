import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import Admin from '../components/Admin'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div``
const Content = styled.div`
  display: flex;
`
// add admin container
const NewAdminContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    background: var(--bg-transparent);
`
const Box = styled.div`
    padding: 30px;
    background: var(--bg-secondary);
    border-radius: 5px;
`
const Fields = styled.div`
    display: flex;
    flex-direction: column;
`
const Label = styled.label`
    color: var(--color-primary);
    padding: 5px 0;
`
const Input = styled.input`
    width: 240px;
    height: 26px;
    border: none;
    outline: none;
    border-radius: 2px;
    padding: 1px 10px;
`
const Buttons = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`
const Button = styled.button`
    padding: 5px 15px;
    margin-right: 10px;
    border: none;
    outline: none;
    font-weight: 600;
    border-radius: 6px;
    background: ${props=>props.color};
    cursor: pointer;
    color: #eee;

    &:hover{
        color: ${props=>props.color};
        background: var(--color-primary);
    }

    &.update-btn {
        background: var(--bg-primary);
    }
    &.cancel-btn {
        background: red;
    }
`
const Home = () => {

  const {token} = useContext(AuthContext);

  const emailRef = useRef()
  const passwordRef = useRef()
  const [newAdmin, setNewAdmin] = useState(false)

  const setupAdmin = (value) => {
    setNewAdmin(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/register`, data, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      setNewAdmin(false)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <Container>
        <Navbar title="Admin" newAdmin={setupAdmin}/>
        <Content>
          <Sidebar />
          <Admin/>
        </Content>

        {newAdmin == true ? (
            <NewAdminContainer>
                <Box>
                    <Fields>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder='Email Address'
                            ref={emailRef}
                            required
                        />
                    </Fields>
                    <Fields>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            ref={passwordRef}
                            placeholder='Password'
                            required
                        />
                    </Fields>
                    <Buttons>
                        <Button className='update-btn' onClick={handleSubmit} >Submit</Button>
                        <Button className='cancel-btn' onClick={() => {
                            setNewAdmin(false)
                        }}>Cancel</Button>
                    </Buttons>
                </Box>
            </NewAdminContainer>
        ): ''}
    </Container>
  )
}

export default Home