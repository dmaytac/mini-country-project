import Countries from "./Countries"
import { useState, useEffect } from "react"
import axios from "axios"

const Country = ()=>{
    //the main data from api--Array[{object}]
    const [countries, setCountries ] = useState([])
  
    //the searched datas are here without editing the original one =>[countries]--Array[{object}]
    const [countriesSearch, setCountriesSearch ] = useState([])
    //counting the data when the user scrolls to bottom and gives the data +10 --Number
    const [countriesCount,setcountriesCount] = useState(10)
    //this is for to show the original data or if it's false shows the searched data or sorted data --Boolean
    const [countyIsLoad,setCountyIsLoad] = useState(true)
    //this array its for searched or sorted data
    const [searchCountry, setSearchCountry ] = useState('')
    //this is getting data from select tag, sorting by name or population
    const [sortCountry, setSortCountry ] = useState('name')
  
    //for fetch the data with axios
    useEffect(()=>{
        fetchCountry()
    },[])
      
    //Scroll updating
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
      }, [countriesCount])
  
    //function for fetching the data from restcountries
    const fetchCountry = async () =>{ 
      try{
        const url = `https://restcountries.com/v3.1/all`
        const res = await axios.get(url)
        const data = await res.data
        setCountries(data)
        //sorting a-z
        setCountries(countries=>countries.sort((a,b)=>a.name.common>b.name.common))
      }catch (error){
        console.log(error)
      }finally{
  
      }
    }
  
    //sorting the object from the <select> tag by name or by population 
    const handleSort=(e)=>{
      setSortCountry(e)
      if(e.includes('name')){
        console.log(e,'handlesort','nam')
        setCountyIsLoad(true)
        setcountriesCount(10)
        setCountries(countries=>countries.sort((a,b)=>a.name.common>b.name.common))
      }
      if(e.includes('population')){
        console.log(e,'handlesort','pop')
        setCountyIsLoad(false)
        setcountriesCount(10)
        setCountriesSearch(countriesSearch=>countries.sort((a,b)=>a.population<b.population))    
      }
    }
  //function for the searching from the input by name
    const handleSearchCountry = (name) =>{
      setCountyIsLoad(false)
      setSearchCountry(name)
      if(name.length===0){
        setCountyIsLoad(true)
        setcountriesCount(10)
      }
      setCountriesSearch(countriesSearch=>countries.filter(country=>{
        return country.name.common.toLowerCase().includes(name.toLowerCase()) 
        ? country.name.common : ''
      }))
    }
  //this functiion is calculating the scroll of client and gives more data(10 per scroll to bottom) if it's needed
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      console.log(scrollTop + clientHeight, scrollHeight)
        if (scrollTop + clientHeight >= scrollHeight) {
          if(countriesCount<=250){
            setcountriesCount(countriesCount+10)
          }
        }
  
    }
  //shows input results (beta)
  // <p>{countriesSearch.length===0 || countriesSearch.length===250 ? '' : countriesSearch.length+' results' } </p>
    return(
      <div className='countries-wrapper'>
        <h3 className=''>There are {countries.length} Countries</h3>
        <div className='input-text-container'>
        <input placeholder='Search for a country...' className='input-countries' type='search' value={searchCountry} onInput={(e)=>handleSearchCountry(e.target.value)}/>
        </div>
        <div className='select-wrapper'>
          <label htmlFor="sort">Sort by </label>
          <select className='select' name="sort" value={sortCountry} onInput={(e)=>handleSort(e.target.value)} >
            <option value='name'>Name</option>
            <option value="population">Population</option>
          </select>
        </div>
        <button className='scrollTop' onClick={() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          }}>⌃</button>
        <br/>
        <br/>
          <div className='countries'>
          {countyIsLoad &&
           <>
              {countries.map((count,index)=>{
                if(index <=countriesCount){
                  return <Countries key={index} count={count}/>
                }
               })}
           </>}
           {!countyIsLoad &&
           <>
              {countriesSearch.map((count,index)=>{
                if(index <=countriesCount){
                  return <Countries key={index} count={count}/>
                }
               })}
           </>}
           
           </div>
            
      </div>
    )
  }

export default Country