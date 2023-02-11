import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import ListProjects from '../components/ListProjects'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import storage from '../utils/firebase'
import {AuthContext} from '../contexts/authContext'

import axios from 'axios'

const Container = styled.div``
const Content = styled.div`
  display: flex;
`

// add new skills container
const AddNewContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  background: var(--bg-transparent);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const AddNewForm = styled.div`
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 5px;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  padding: 5px 0;
  color: var(--color-primary);
`
const Input = styled.input`
  width: 350px;
  height: 28px;
  padding-left: 10px;
  border: none;
  outline: none;
  border-radius: 3px;
`
const Buttons = styled.div`
  margin: 20px 0 0 10px;
  display: flex;
  justify-content: center;
`
const Button = styled.button`
  padding: 5px 10px;
  border: none;
  outline: none;
  font-weight: 600;
  border-radius: 5px;
  background: ${props=>props.color ? props.color : 'var(--bg-primary)'};
  color: var(--color-primary);
  margin-right: 15px;
  cursor: pointer;
`

// edit container
const EditContainer = styled.div`
  position: absolute;
  top: 0;
  z-index: 100;
  background: var(--bg-transparent);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EditForm = styled.div`
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 5px;
`

const Projects = () => {

  // files ref
  const nameRef = useRef()
  const codeRef = useRef()
  const previewRef = useRef()

  const [addNew, setAddNew] = useState(false)

  // upload
  const [showUpload, setShowUpload] = useState(false)
  const [img, setImg] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  // get projects useState
  const [projects, setProjects] = useState([])

  // token
  const {token} = useContext(AuthContext)


  const addNewShow = (value) => {
    setAddNew(value)
  }

  const upload = (data) => {
    const fileName = new Date().getTime() + data.label[0]
    const storageRef = ref(storage, `/items/${fileName}`)
    const uploadTask = uploadBytesResumable(storageRef, data.file[0])

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        setImgURL(url)
      })
    })
  }

  const handleUpload = () => {
    const data = {
      file: img, label: "image"
    }

    upload(data)
  }

  // get all projrcts
  useEffect(() => {
    getProjects()
  }, [])

  const getProjects = () => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`).then((res) => {
      setProjects(res.data.data)
    }).then((err) => {
      console.log(err)
    })
  }

  const handleSubmit = () => {
    const data = {
      name: nameRef.current.value,
      imgURL: imgURL,
      previewLink: previewRef.current.value,
      sourceCode: codeRef.current.value
    }
    axios.post(`${import.meta.env.VITE_SERVER_URL}/projects/project`, data, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      setAddNew(false)
      getProjects()
    }).catch((err) => {
      console.log(err)
    })
  }


  // edit container
  const [showEdit, setShowEdit] = useState(false)
  const [passedData, setPassedData] = useState(null)

  // edit info state
  const [editNameRef, setEditNameRef] = useState(null)
  const [editCodeRef, setEditCodeRef] = useState(null)
  const [editPreviewLinkRef, setEditPreviewLinkRef] = useState(null)

  // edit data state
  const [EditImageUpload, setEditImageUpload] = useState(null)

  const showEditFunc = (value, data) => {
    setShowEdit(value)
    setPassedData(data)
  }

  const handleEditUpdate = (id) => {

    const files = {
      file: EditImageUpload, label: "image"
    }

    if(files.file != null){
        const fileName = new Date().getTime() + files.label[0]
        const storageRef = ref(storage, `/items/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, files.file[0])
    
        uploadTask.on("state_changed", (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgURL(url)
            submit(id)
          })
        })
    }else {
      submit(id)
    }

  }

  const submit = (id) => {

    const data = {
      name: editNameRef || passedData.name,
      imgURL: imgURL || passedData.imgURL,
      previewLink: editPreviewLinkRef || passedData.previewLink,
      sourceCode: editCodeRef || passedData.sourceCode
    }

    axios.put(`${import.meta.env.VITE_SERVER_URL}/projects/${id}`, data, {
      headers: {
        Bearer: token
      }
    }).then((res) => {
      setShowEdit(false)
      getProjects()
    }).catch((err) => {
      console.log(err)
    })
  }


  return (
    <Container>
        <Navbar title="Projects" />
        <Content>
          <Sidebar />
          <ListProjects
            addNewShow={addNewShow}
            projects={projects}
            getProjects={getProjects}
            showEditFunc={showEditFunc}
          />
        </Content>

        {addNew == true ? (
          <AddNewContainer>
              <AddNewForm>
                <Box>
                  <Label>Name</Label>
                  <Input type='text' placeholder='Name' ref={nameRef} required></Input>
                </Box>
                <Box>
                  <Label>Image</Label>
                  <Input type='file' onChange={(e) => setImg(e.target.files)}></Input>
                </Box>
                <Box>
                  <Label>Source Code</Label>
                  <Input type='text' placeholder='Source Code' ref={codeRef} required></Input>
                </Box>
                <Box>
                  <Label>Preview Link</Label>
                  <Input type='text' placeholder='Preview Link' ref={previewRef} required></Input>
                </Box>
                <Buttons>
                  {imgURL == null ? (
                    <Button onClick={handleUpload}>Upload</Button>
                  ): ''}
                  {imgURL != null ? (
                    <Button onClick={handleSubmit}>Submit</Button>
                  ): ''}
                  <Button color='red' onClick={e=>setAddNew(false)}>Cancel</Button>
                </Buttons>
              </AddNewForm>
          </AddNewContainer>
        ) : ''}

        {showEdit == true ? (
          <EditContainer>
              <EditForm>
                <Box>
                  <Label>Name</Label>
                  <Input type='text' placeholder='Name' defaultValue={passedData.name} onChange={(e)=>setEditNameRef(e.target.value)} ></Input>
                </Box>
                <Box>
                  <Label>Image</Label>
                  <Input type='file' onChange={(e)=>setEditImageUpload(e.target.files)}></Input>
                </Box>
                <Box>
                  <Label>Source Code</Label>
                  <Input type='text' placeholder='Source Code' defaultValue={passedData.sourceCode} onChange={(e)=>setEditCodeRef(e.target.value)} ></Input>
                </Box>
                <Box>
                  <Label>Preview Link</Label>
                  <Input type='text' placeholder='Preview Link' defaultValue={passedData.previewLink} onChange={(e)=>setEditPreviewLinkRef(e.target.value)} ></Input>
                </Box>
                <Buttons>
                  <Button onClick={()=>handleEditUpdate(passedData._id)}>Update</Button>
                  <Button color='red' onClick={()=>setShowEdit(false)}>Cancel</Button>
                </Buttons>
              </EditForm>
          </EditContainer>
        ): ''}
    </Container>
  )
}

export default Projects