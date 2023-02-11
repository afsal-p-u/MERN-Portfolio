import axios from 'axios'
import React, { useState, useRef, useContext } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ListSkills from '../components/ListSkills'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div``
const Content = styled.div`
  display: flex;
`

// add new skils container
const AddNewSkillsContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background: var(--bg-transparent);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const NewSkillForm = styled.form`
  padding: 35px;
  background: var(--bg-secondary);
  border-radius: 5px;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7px;
`
const Label = styled.label`
  color: var(--color-primary);
`
const Input = styled.input`
  border: none;
  outline: none;
  padding-left: 10px;
  width: 200px;
  height: 25px;
  background: var(--color-primary);
`
const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  padding: 5px 10px;
  margin-right: 15px;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: 600;
  color: var(--color-primary);
  background: ${props=>props.color ? props.color : 'var(--bg-primary)'};
  cursor: pointer;
`

// edit skill container
const EditSkillsContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background: var(--bg-transparent);
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EditSkillForm = styled.form`
  padding: 35px;
  background: var(--bg-secondary);
  border-radius: 5px;
`


const Skills = () => {

  const skillRef = useRef()
  const valueRef = useRef()
  const newSkill = useRef()
  const newValue = useRef()

  const {token} = useContext(AuthContext)

  const [addSkills, setAddSkills] = useState(false)
  const [editSkills, setEditSkills] = useState(false)
  const [fullData, setFullData] = useState({})

  const addSkillsClicked = (value) => {
    setAddSkills(value)
  }
  const ediSkillsClicked = (value, data) => {
    setEditSkills(value)
    setFullData(data)
  }

  const editHandleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: skillRef.current.value,
      value: valueRef.current.value
    }
    if(data.name == fullData.name && data.value == fullData.value){
      return
    }
    axios.put(`${import.meta.env.VITE_SERVER_URL}/skills/${fullData._id}`, data, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      console.log(res)
      setEditSkills(false)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

  const addHandleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: newSkill.current.value,
      value: newValue.current.value
    }
    axios.post(`${import.meta.env.VITE_SERVER_URL}/skills/newskills`, data, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      setAddSkills(false)
      window.location.reload()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container>
        <Navbar title='Skills' />
        <Content>
          <Sidebar />
          <ListSkills addSkills={addSkillsClicked} editSkills={ediSkillsClicked}/>
        </Content>

        {addSkills == true ? (
          <AddNewSkillsContainer>
            <NewSkillForm onSubmit={addHandleSubmit}>
              <Box>
                <Label>Name</Label>
                <Input type='text' placeholder='Skill' ref={newSkill} />
              </Box>
              <Box>
                <Label>Value</Label>
                <Input type='number' min='0' max='100' placeholder='Value' ref={newValue} />
              </Box>
              <Buttons>
                  <Button>Submit</Button>
                  <Button color='red' onClick={()=>setAddSkills(false)}>Cancel</Button>
              </Buttons>
            </NewSkillForm>
          </AddNewSkillsContainer>
        ): ''}

        {editSkills == true ? (
          <EditSkillsContainer>
            <EditSkillForm onSubmit={e=>editHandleSubmit(e)}>
              <Box>
                <Label>Name</Label>
                <Input type='text' placeholder='Skill' ref={skillRef}  defaultValue={fullData.name} />
              </Box>
              <Box>
                <Label>Value</Label>
                <Input type='number' min='0' max='100' placeholder='Value' ref={valueRef}  defaultValue={fullData.value} />
              </Box>
              <Buttons>
                  <Button>Update</Button>
                  <Button color='red' onClick={()=>setEditSkills(false)}>Cancel</Button>
              </Buttons>
            </EditSkillForm>
          </EditSkillsContainer>
        ): ''}
    </Container>
  )
}

export default Skills