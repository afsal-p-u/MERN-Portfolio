import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import axios from 'axios'

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 50px;
    background: var(--bg-primary);

    @media (max-width: 576px){
        padding: 15px;
    }
`
const Title = styled.h1`
    margin-top: 5vh;
    text-align: center;
    color: #eee;
`
const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
`
const ProjectsContainer = styled.div`
    margin: 0 auto;
    margin-top: 50px;
    width: 300px;
    height: 260px;
    display: flex;
    flex-direction: column;
    border-radius: 9px;
    background: #2d2846;
    padding: 5px;
`
const Top = styled.div`
    height: 180px;
    width: 100%;
    background: yellow;
    object-fit: cover;
    border-radius: 9px;
    overflow: hidden;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
`
const Bottom = styled.div`
    display: flex;
    flex-direction: column;
`
const InfoText = styled.h3`
    padding: 5px 5px;
    color: #eee;
    font-size: 15px;
`
const Buttons = styled.div`
    padding: 5px  5px;
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
`
const Button = styled.button`
    padding: 7px 9px;
    border-radius: 7px;
    font-weight: 600;
    color: #eee;
    background: var(--bg-primary);
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        background: #c7c2c2;
        & a {
            color: #000;
        }
    }
`
const A = styled.a`
    color: #eee;
`

const Projects = ({load}) => {

    const [projects, setProjects] = useState([])

    const getProjects = async (req, res) => {
        load(true)
        axios.get(`${import.meta.env.VITE_SERVER}/projects`).then((res) => {
            setProjects(res.data.data)
            load(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProjects()
    }, [])

  return (
    <Container id='projects'>
        <Title>Projects</Title>
        <Row>
            {projects.map((project) => (
                <ProjectsContainer key={project._id}>
                    <Top>
                        <Image src={project.imgURL} ></Image>
                    </Top>
                    <Bottom>
                        <InfoText>{project.name}</InfoText>
                        <Buttons>
                            <Button><A href={project.previewLink}>Preview</A></Button>
                            <Button><A href={project.sourceCode}>Source Code</A></Button>
                        </Buttons>
                    </Bottom>
                </ProjectsContainer>
            ))}
        </Row>
    </Container>
  )
}

export default Projects