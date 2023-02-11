import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 50px;
    background: var(--bg-secondary);

    @media (max-width: 768px){
        padding: 25px;
    }
`
const Title = styled.h1`
    margin-top: 5vh;
    color: #eee;
    text-align: center;
`
const Form = styled.form`
    padding: 50px;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    @media (max-width: 768px){
        padding: 20px;
    }
    @media (max-width: 576px){
        flex-direction: column;
    }
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
`
const FormInputs = styled.div`
    display: flex;
    flex-direction: column;
`
const Label = styled.label`
    color: #eee;
    margin: 5px 5px 5px 0;
`
const Input = styled.input`
    outline: none;
    border: none;
    height: 2.7em;
    padding-left: 10px;
    background: #eee;
`
const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
`
const Textarea = styled.textarea`
    height: 180px;
    resize: none;
    padding: 5px 5px 5px 10px;
    border: none;
    outline: none;
    background: #eee;
`
const Button = styled.button`
    margin-top: 10px;
    padding: 10px;
    font-weight: 600;
    background: var(--bg-primary);
    color: #eee;
    border: none;
    outline: none;
    font-size: 15px;
    cursor: pointer;

    &:hover {
        background: #c7c2c2;
        color: #000;
    }
`
const Status = styled.div`
    position: fixed;
    width: 300px;
    height: 5vh;
    right: 20px;
    bottom: 20px;
    background: ${props => props.color};
    border-radius: 8px;
    padding: 5px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    z-index: 9999999999;
    font-weight: 600;
    color: #eee;
`

const Contact = (props) => {

    const nameRef = useRef()
    const emailRef = useRef()
    const subjectRef = useRef()
    const messageRef = useRef()

    const [status, setStatus] = useState("equal")
    
    const handleSubmit = async(e) => {

        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            subject: subjectRef.current.value,
            message: messageRef.current.value
        }
        props.load(true)
        await axios.post(`${import.meta.env.VITE_SERVER}/contact`, data).then((res) => {
            setStatus("yes")
            props.load(false)

            nameRef.current.value = ''
            emailRef.current.value = ''
            subjectRef.current.value = ''
            messageRef.current.value = ''

            setTimeout(() => {
                setStatus("equal")
            }, 5000)

        }).catch((err) => {
            setStatus('no')
            props.load(false)
            
            setTimeout(() => {
                setStatus("equal")
            }, 5000)
        })
    }

  return (
    <Container id='contact'>
        <Title>Contact</Title>
        <Form onSubmit={handleSubmit}>
            <Left>
                <FormInputs>
                    <Label>Name :</Label>
                    <Input type="text" placeholder='Full Name' ref={nameRef} required/>
                </FormInputs>
                <FormInputs>
                    <Label>Email :</Label>
                    <Input type="email" placeholder='example@gmail.com' ref={emailRef} required/>
                </FormInputs>
                <FormInputs>
                    <Label>Subject :</Label>
                    <Input type="text" placeholder='Subject' ref={subjectRef} required/>
                </FormInputs>
            </Left>
            <Right>
                <Label>Message :</Label>
                <Textarea placeholder='message...' ref={messageRef} required></Textarea>
                <Button>Submit</Button>
            </Right>
        </Form>
        {status == "yes" ? (
            <Status color='green'>
                Successfull...
            </Status>
        ): status == 'no' ? (
            <Status color='red'>
                Failed to send...
            </Status>
        ): ''}
    </Container>
  )
}

export default Contact