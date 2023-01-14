import Countries from "./Countries"
import { useState, useEffect } from "react"
import axios from "axios"
import { FaSortAlphaDown,FaSortNumericDownAlt,FaFilter } from "react-icons/fa";

const Country = ({darkMode})=>{
    //the main data from api--Array[{object}]
    const [countries, setCountries ] = useState([])
    //the searched/filtered/sorted datas are here without editing the original one
    const [countriesSearch, setCountriesSearch ] = useState([])
    //counting the data when the user scrolls to bottom and gives the data +10 --Number
    const [countriesCount,setcountriesCount] = useState(10)
    //this is for to show the original data or if it's false shows the searched data or sorted data --Boolean
    const [countyIsLoad,setCountyIsLoad] = useState(true)
    //this array its for searched or sorted data
    const [searchCountry, setSearchCountry ] = useState('')
    //this is getting data from select tag, sorting by name or population
    const [sortCountry, setSortCountry ] = useState('name')
    //filter by region
    const [filterCountry,setFilterCountry] = useState('')
    //back to the top appear/disapear
    const [backTotheTop, setBackTotheTop] = useState(false)
  
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
      setFilterCountry('nofilter')
      setSortCountry(e)
      if(e.includes('name')){
        console.log(e,'handlesort','nam')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.sort((a,b)=>a.name.common>b.name.common))
      }
      if(e.includes('population')){
        console.log(e,'handlesort','pop')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.sort((a,b)=>a.population<b.population))    
      }
    }
  //function for the searching from the input by name
    const handleSearchCountry = (name) =>{
      setSearchCountry(name)
      setCountyIsLoad(false)

      if(name.length===0){
        setFilterCountry('nofilter')
        setSortCountry('name')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country))
      }

      
      setCountriesSearch(countriesSearch=>countries.filter(country=>{
        //check input value in country name
        return country.name.common.toLowerCase().includes(name.toLowerCase()) 
        ? country.name.common 
        //check input value in country capital
        : ((country.capital !== null && country.capital !== undefined) ? country.capital.toString().toLowerCase().includes(name.toLowerCase()) : '' )
        //: ""
      }))
    }
    const handleFilter = (filter) =>{
      setFilterCountry(filter)
      setSortCountry('name')
      if(filter.includes('nofilter')){
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country))
      }  
      if(filter.includes('asia')){
        console.log(filter,'filter','asia',)
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country.region.toLowerCase().includes(filter) ))       
      }
      if(filter.includes('africa')){
        console.log(filter,'filter','africa')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country.region.toLowerCase().includes(filter) ))    
      }
      if(filter.includes('america')){
        console.log(filter,'filter','america')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country.region.toLowerCase().includes(filter) ))    
      }
      if(filter.includes('europe')){
        console.log(filter,'filter','europe')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country.region.toLowerCase().includes(filter) ))    
      }
      if(filter.includes('oceania')){
        console.log(filter,'filter','oceanina')
        setCountyIsLoad(false)
        setcountriesCount(20)
        setCountriesSearch(countriesSearch=>countries.filter((country)=>country.region.toLowerCase().includes(filter) ))    
      }
    }
  //this functiion is calculating the scroll of client and gives more data(10 per scroll to bottom) if it's needed
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      console.log(scrollTop ,clientHeight, scrollHeight)
      if(scrollTop >= 1000){
        //if the scrolltop >= 1000 then show the button for back to the top
        setBackTotheTop(true)
      }
      if(scrollTop<1000){
        //if the scrolltop < 1000 then hide the button for back to the top
        setBackTotheTop(false)
      }
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
        
        <div className='input-text-container'>
        <input placeholder='Search for a country or capital...' className={`input-countries-${darkMode ? 'dark':'light'}`} type='search' value={searchCountry} onInput={(e)=>handleSearchCountry(e.target.value)}/>
        <div className='select-wrapper'>

          <div className='select-wrapper-filter'>
          <FaFilter size={18} />
            <select className={`select-${darkMode ? 'dark':'light'}`} name="filter" value={filterCountry} onInput={(e)=>handleFilter(e.target.value)} >
              <option value='nofilter'>No Filter</option>
              <option value='asia'>Asia</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
          <div className='select-wrapper-sort'>
        {sortCountry === 'name' &&  <FaSortAlphaDown size={22} />}
        {sortCountry === 'population' &&  <FaSortNumericDownAlt size={22} />}
            <select className={`select-${darkMode ? 'dark':'light'}`} name="sort" value={sortCountry} onInput={(e)=>handleSort(e.target.value)} >
              <option value='name'>Name</option>
              <option value="population">Population</option>
            </select>
          </div>
        
        </div>
        </div>
        {backTotheTop && <button className='scrollTop' onClick={() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          }}>⌃</button>}
        <br/>
        <br/>
          <div className='countries'>
          {countyIsLoad &&
           <>
              {countries.map((count,index)=>{
                if(index <=countriesCount){
                  return <Countries key={index} count={count} darkMode={darkMode}/>
                }
               })}
           </>}
           {!countyIsLoad &&
           <>
              {countriesSearch.map((count,index)=>{
                if(index <=countriesCount){
                  return <Countries key={index} count={count} darkMode={darkMode}/>
                }
               })}
           </>}
           
           </div>
            
      </div>
    )
  }

export default Country