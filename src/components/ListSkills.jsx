import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div`
  width: 100%;
  padding: 20px;
  background: var(--bg-primary)
`
const Top = styled.div` 
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
`
const Button = styled.div`
  border: none;
  outline: none;
  padding: 5px 10px;
  margin-right: 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: ${props=>props.bgcolor};
  color: ${props=>props.color ? props.color : '#eee'}

`
const Bottom = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1rem;
`
const SkillBox = styled.div`
  margin: 0 auto;
  width: 300px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: row;
  background: var(--bg-secondary);
  border-radius: 5px;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  font-size: 15px;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 5px;
`
const Input = styled.input`
  backgound: var(--color-primary);
  box-sizing: border-box;
  border: none;
  outline: none;
  width: 100px;
  height: 30px;
  padding-left: 10px;

  &:disabled {
    background: var(--color-primary);
  }
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ListSkills = ({addSkills, editSkills}) => {

  const {token} = useContext(AuthContext)

  const [skills, setSkills] = useState([])

  const addSkill = (e) => {
    addSkills(true)
  }
  const editSkill = (data) => {
    editSkills(true, data)
  }

  const getSkills = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/skills`).then((res) => {
      setSkills(res.data.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getSkills()
  }, [])

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_SERVER_URL}/skills/${id}`, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      getSkills()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container>
      <Top>
        <Button color='#5a5aa1' bgcolor='#eee' onClick={addSkill}>Add New</Button>
      </Top>
      <Bottom>
        {skills.map((skill) => (
          <SkillBox key={skill._id}>
            <Left>
              <Label>{skill.name}</Label>
              <Input type="number" placeholder='0' defaultValue={skill.value} disabled/>
            </Left>
            <Right>
              <Button bgcolor='#5a5aa1' onClick={e=>editSkill(skill)}>Edit</Button>
              <Button bgcolor='red' onClick={()=>handleDelete(skill._id)}>Delete</Button>
            </Right>
          </SkillBox>
        ))}
      </Bottom>
    </Container>
  )
}

export default ListSkills