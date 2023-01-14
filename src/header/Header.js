const Header = ({darkMode}) =>{
  console.log(darkMode)
      return(
        <div className={`header-wrapper-${darkMode ? 'dark':'light'}`}>
          <h1>Countries App</h1>
        </div>
      )
    }
  
  export default Header