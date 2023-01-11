
const Countries = ({count})=>{
    const population =count.population.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    return(
      <div className='country'>
        <img src={count.flags.svg} alt={count.name.common}/>
        <h3>{count.name.common}</h3>
        <div className='country-text'>
          {count.capital === undefined ? '' : <p><b>Capital:</b> {count.capital}</p>}
          <p><b>Region:</b> {count.region}{count.subregion ? ', '+count.subregion : ''}</p>
          <p><b>Population:</b> {population}</p>
        </div>
      </div>
    )
  }

export default Countries