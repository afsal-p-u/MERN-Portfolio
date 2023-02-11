import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: #3d3d5c;
`
const Title = styled.h1`
    text-align: center;
    color: #eee;
    padding-top: 9vh; 
`
const Row = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    gap: 1rem;

    @media (max-width: 576px){
        padding: 50px 0;
        margin-left: -3px;
    }
`
const SkilsContainer = styled.div`
    margin: 0 auto;
    background: var(--color-primary);
    width: 350px;
    min-height: 50px;
    position: relative;
    border-radius: 7px;
    z-index: 2;
    display: flex;
    flex-direction: column;

    @media (max-width: 576px){
        max-width: 280px;
        margin: 0 auto;
    }
`
const SkillTitle = styled.h3`
    margin: 5px 0;
    padding: 0 10px;
    color: #eee;
`
const Small = styled.small`
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: 600;
    color: #eee;
`
const Bar1 = styled.div`
    box-sizing: border-box;
    margin: 0 2.5%;
    margin-bottom: 10px;
    background: gray;
    width: 95%;
    height: 10px;
`
const Bar2 = styled.h1`
    height: 100%;
    width: ${props => props.value}%;
    background: #5a5aa1;
`


const Skills = (props) => {

    const [skills, setSkills] = useState([])

    useEffect(() => {
        props.load(true)
        const getSkills = async (req, res) => {
            axios.get(`${import.meta.env.VITE_SERVER}/skills`).then((res) => {
                console.log(res)
                setSkills(res.data.data)
                props.load(false)
            })
        }
        getSkills()
    }, [])

  return (
    <Container id='skills'>
      <Title>Skills</Title>
      <Row>
        {skills.map((skill) => (
            <SkilsContainer key={skill._id}>
                <Small>{skill.value}%</Small>
                <SkillTitle>{skill.name}</SkillTitle>
                <Bar1>
                    <Bar2 value={skill.value}></Bar2>
                </Bar1>
            </SkilsContainer>
        ))}
      </Row>
    </Container>
  )
}

export default Skills
