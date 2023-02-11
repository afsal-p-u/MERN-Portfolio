import axios from 'axios'
import React, { useContext } from 'react'
import styled from 'styled-components'

import Img1 from '../assets/project1.jpg'
import { AuthContext } from '../contexts/authContext'

const Container = styled.div`
    width: 100%;
    padding: 20px;
    background-color: var(--bg-primary);
`
const Top = styled.div``
const Bottom = styled.div`
    margin-top: 20px;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr))

`
const ProjectBox = styled.div`
    padding: 10px;
    background: var(--bg-secondary);
    width: 300px;
    border-radius: 5px;
`
const ImgContainer = styled.div`
    height: 140px;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
`
const Desc = styled.div`
    padding: 5px 0;
`
const Name = styled.h3`
    color: var(--color-primary);
    font-size: 16px;
`
const Buttons = styled.div`
    margin-top: 10px;
`
const Button = styled.button`
    padding: 5px 10px;
    border: none;
    outline: none;
    font-weight: 600;
    border-radius: 5px;
    margin-right: 15px;
    cursor: pointer;
    color: ${props=>props.color};
    background: ${props=>props.bgColor};
`


const ListProjects = ({addNewShow, projects, getProjects, showEditFunc}) => {

    // token
    const {token} = useContext(AuthContext);

    // delete project   
    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/projects/${id}`, {
            headers: {
                Bearer: token
            }
        }).then((res) => {
            getProjects()
        }).catch((err) => {
            console.log(err)
        })
    }

    //edit project
    const handleEdit = (project) => {
        showEditFunc(true, project)
    }

  return (
    <Container>
        <Top>
            <Button color='#5a5aa1' bgColor="#eee" onClick={()=>{
                addNewShow(true)
            }}>Add New</Button>
        </Top>
        <Bottom>
            {projects.map((project) => (
                <ProjectBox key={project._id}>
                    <ImgContainer>
                        <Image src={project.imgURL}></Image>
                    </ImgContainer>
                    <Desc>
                        <Name>{project.name}</Name>
                        <Buttons>
                            <Button color='#eee' bgColor="#5a5aa1" onClick={()=>handleEdit(project)}>Edit</Button>
                            <Button color='#eee' bgColor="red" onClick={()=>handleDelete(project._id)}>Delete</Button>
                        </Buttons>
                    </Desc>
                </ProjectBox>
            ))}
        </Bottom>
    </Container>
  )
}

export default ListProjects