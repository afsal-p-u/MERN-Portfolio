import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div`
    background: var(--bg-primary);
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 10px 0;
    justify-content: center;
`
const Items = styled.div`
    width: 85%;
    padding: 10px;
`
const List = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
`
const Count = styled.h3`
    flex: 1;
    padding-left: 20px;
`
const Email = styled.div`
    flex: 1;
`
const Operation = styled.div`
    flex: 1;
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

// error message container

const ErrorMessage = styled.div`
    width: 350px;
    height: 17px;
    background: ${props=>props.color};
    padding: 20px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 7px;
    transition: all 300ms ease;
`
const H5 = styled.h5`
    color: var(--color-primary);
`

// edit admin container
const EditAdmin = styled.div`
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

const Admin = () => {

    const {token} = useContext(AuthContext)
    const [admin, setAdmin] = useState([]);
    const [message, setMessage] = useState(null)
    const [color, setColor] = useState("green");
    const [showEdit, setShowEdit] = useState(false)
    const [tempData, setTempData] = useState('')

    const emailRef = useRef()
    const passwordRef = useRef()
 
    const getAdmins = () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/admin`, {
            headers: {
                Bearer: token
            }
        }).then((res) => {
            setAdmin(res.data.data)
    
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAdmins()
    }, [])


    const handleEdit = (data) => {
        setShowEdit(true)
        setTempData(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axios.put(`${import.meta.env.VITE_SERVER_URL}/admin/${tempData._id}`, data, {
            headers: {
                Bearer: token
            }
        }).then((res) => {
            setShowEdit(false)
            setMessage(res.data.message)
            setColor("green")
            setTimeout(() => {
                setMessage(null)
            }, 7000)
        }).catch((err) => {
            setMessage(err.response.data.message)
            setColor("red")

            setTimeout(() => {
                setMessage(null)
            }, 7000)
        })
    }

    const handleDelete = (id) => {
        console.log(id)
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/admin/${id}`, {
            headers: {
                Bearer: token
            }
        }).then((res) => {
            getAdmins()
            setMessage(res.data.message)
            setColor("green")

            setTimeout(() => {
                setMessage(null)
            }, 7000)
        }).catch((err) => {
            setMessage(err.response.data.message)
            setColor("red")

            setTimeout(() => {
                setMessage(null)
            }, 7000)
        })
    }

    
  return (
    <Container>
        <Items>
            <List style={{background:"#eee", fontWeight: 600}} >
                <Count>ID</Count>
                <Email>Email</Email>
                <Operation>Edit/Delete</Operation>
            </List>
            
            {/* admins map */}
            {admin.map((val) => (
                <List key={val._id}>
                    <Count style={{color:"#eee", fontWeight: 400}} >{val._id}</Count>
                    <Email style={{color:"#eee", fontWeight: 400}} >{val.email}</Email>
                    <Operation>
                        <Button 
                            color='blue' 
                            onClick={()=>handleEdit(val)
                        }>Edit</Button>
                        <Button color='red' onClick={()=>handleDelete(val._id)}>Delete</Button>
                    </Operation>
                </List>
            ))}
        </Items>

        {showEdit == true ? (
            <EditAdmin>
                <Box>
                    <Fields>
                        <Label>Email</Label>
                        <Input 
                            type="email" 
                            placeholder='Email Address'
                            ref={emailRef}
                            defaultValue={tempData.email}
                        />
                    </Fields>
                    <Fields>
                        <Label>Password</Label>
                        <Input 
                            type="password" 
                            ref={passwordRef}
                            placeholder='Password'
                        />
                    </Fields>
                    <Buttons>
                        <Button className='update-btn' onClick={handleSubmit}>Update</Button>
                        <Button className='cancel-btn' onClick={() => {
                            setShowEdit(false)
                        }}>Cancel</Button>
                    </Buttons>
                </Box>
            </EditAdmin>
        ) : ''}

        {message != null ? (
            <ErrorMessage color={color}>
                <H5>{message}</H5>
            </ErrorMessage>
        ): ''}
    </Container>
  )
}

export default Admin