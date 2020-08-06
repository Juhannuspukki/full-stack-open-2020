import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country";


const App = () => {

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterCountries = () => {
    const list = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));
    if (list.length === 1) {
      return (
          <Country country={list[0]}/>
        )
    }
    else if (list.length <= 10) {
      return (
        list.map(country =>
          <p key={country.alpha3Code}>
            {country.name}
            <button onClick={() => setFilter(country.name)}>show</button>
          </p>
        )
      )
    }
    else {
      return <p>Too many matches, specify another filter</p>
    }
  }

  return (
    <div>
      <div>find countries <input onChange={handleFilterChange} value={filter} /></div>
      {filterCountries()}
    </div>
  )

}

export default App
