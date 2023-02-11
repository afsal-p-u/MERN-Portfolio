import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import About from '../components/About'
import Contact from '../components/Contact'
import Education from '../components/Education'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

// loading container
const LoadingContainer = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #5a5aa1c4;
    z-index: 9999999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 100ms;
`
const Loader = styled.div`
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 30px;
    height: 30px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
`

const Home = () => {

  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, _setLoading] = useState(true)

  const setLoading = (load) => {
    _setLoading(load)
  }

  if(loading == true){
    document.body.style.overflowY = "hidden"
  }else {
    document.body.style.overflowY = "scroll"
  }
  const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
  };
  
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return(
    <div style={{minWidth: "350px"}}>
        <Navbar 
          scroll={scrollPosition} 
        />
        <Main />
        <About />
        <Education />
        <Skills load={setLoading} />
        <Projects load={setLoading}/>
        <Contact load={setLoading}/>
        
      {loading == true && (
        <LoadingContainer>
          <Loader></Loader>
        </LoadingContainer>
      )}
    </div>
  )
}

export default Home