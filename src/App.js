import './styles/App.css';
import React from 'react'
import Header from './header/Header';
import Country from './components/Country';

const App = () =>{
  return(
    <div className='App'>
      <Header />
      <Country />
      
    </div>
  )
}

export default App;

