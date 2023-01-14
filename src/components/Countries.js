//(in currency tag)get name of currency, slice the last item in array, toSring the first letter and uppercase + the other word except the first letter 
//console.log((count.currencies !== undefined && count.currencies !== null)  ? Object.values(count.currencies)[0].name.split(' ').slice(-1).toString()[0].toUpperCase()+Object.values(count.currencies)[0].name.split(' ').slice(-1).toString().slice(1):'')

const Countries = ({count,darkMode})=>{
  const population =count.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  return(
    <div className={`country-${darkMode ? 'dark':'light'}`}>
      <img className="country-img" src={count.flags.svg} alt={count.name.common}/>
      <h3>{count.name.common}</h3>
      <div className='country-text'>
        {count.capital === undefined ? '' : <p><b>Capital:</b> {count.capital}</p>}
        <p><b>Region:</b> {count.region}{count.subregion ? ', '+count.subregion : ''}</p>
        <p><b>Population:</b> {population}</p>
        
        {count.currencies !== undefined 
        ? <p><b>Currency:</b> {Object.values(count.currencies)[0].name.split(' ').slice(-1).toString()[0].toUpperCase()+Object.values(count.currencies)[0].name.split(' ').slice(-1).toString().slice(1)+ ' ('+Object.values(count.currencies)[0].symbol+ ')'}</p>
        : ''
        
        }

      </div>
        
    </div>
  )
}



export default Countries