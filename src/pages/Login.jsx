import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
`
const LoginForm = styled.form`
    padding: 30px;
    background: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
`
const Input = styled.input`
    width: 250px;
    padding-left: 10px;
    border: none;
    outline: none;
    background: var(--color-primary);
    height: 35px;
    margin-bottom: 10px;
    border-radius: 2px;
`
const Button = styled.button`
    background: var(--bg-primary);
    color: var(--color-primary);
    padding: 5px 20px;
    cursor: pointer;
    font-weight: 600;
    border-radius: 5px;
    border: none;
    outline: none;
    margin: 6px 0;
    font-size: 15px;
`
const P = styled.a`
    color: var(--color-primary);
    font-size: 13px;
    margin-top: 5px;
`

const Login = () => {

    const {setToken} = useContext(AuthContext)

    const emailRef = useRef()
    const passwordRef = useRef()

        const handleSubmit = (event) => {
            event.preventDefault()

            const data = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/login`, data).then((res) => {
                setToken(res.data.data.token)
            }).catch((err) => {
                console.log(err)
            })
        }

  return (
    <Container>
        <LoginForm>
            <Input type="email" placeholder='Email' ref={emailRef} />
            <Input type='password' placeholder='Password' ref={passwordRef} />
            <Button onClick={handleSubmit}>Login</Button>
            <P href=''>Forgot email and password ?</P>
        </LoginForm>
    </Container>
  )
}

export default Login