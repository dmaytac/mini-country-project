import './styles/App.css';
import React, { useEffect, useState } from 'react'
import Header from './header/Header';
import Country from './components/Country';
import { DarkModeSwitch } from 'react-toggle-dark-mode';




const App = () =>{
  
  const [darkMode, setDarkMode] = useState(false)
  useEffect(()=>{
    document.body.className = (darkMode ? 'dark':'light')
  },[darkMode])
  const toggleDarkMode = (checked)=>{
    setDarkMode(checked)
  }
  return(
    <div className='App'>

      <DarkModeSwitch
        className='btn-darkmode'
        checked={darkMode}
        onChange={toggleDarkMode}
        />
      <Header  darkMode={darkMode}/>
      <Country darkMode={darkMode}/>
    </div>
  )
}

export default App;
//<button className='btn-darkmode' onClick={()=>setDarkMode(!darkMode)}>{darkMode ? '☀️' : '🌙'}</button>

