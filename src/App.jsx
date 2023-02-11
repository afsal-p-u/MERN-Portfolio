import React, { useContext, useState } from "react"
import {Routes, Route, Router, Navigate} from 'react-router-dom'
import { AuthContext } from "./contexts/authContext"

import './App.css'

import Home from "./pages/Home"
import Login from "./pages/Login"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"

function App() {

  const {token} = useContext(AuthContext)
  console.log(token)

  return (
      <>
        <Routes>
          <Route path="/login" element={token ? <Navigate to='/' /> : <Login />} />

          <Route path="/">
            <Route index={true} element={token ? <Home /> : <Login /> } />
            <Route path="projects" element={token ? <Projects /> : <Navigate to='/login' />} />
            <Route path="skills" element={token ? <Skills /> : <Navigate to='/login' />}/>
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </>
  )
}

export default App
