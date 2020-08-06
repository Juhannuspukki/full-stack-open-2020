import React, { useState, useEffect } from 'react'
import axios from "axios";

const Country = (props) => {
  const [ weather, setWeather] = useState(
    {
      current:
        {
          wind_kph: "-",
          wind_dir: "-",
          temp_c: "-",
          condition: {
            icon: "/"
          }
        }
      }
    )

  const hook = () => {
    axios
      .get(`https://api.apixu.com/v1/forecast.json?key=befb6e6c89cb472c818111502192407&q=${props.country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(hook, {})


  return (
    <>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>populaton {props.country.population}</p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={props.country.flag} width="150px"/>
      <h2>Weather in {props.country.capital}</h2>
      <p><strong>temperature:</strong> {weather.current.temp_c} Celsius</p>
      <img src={weather.current.condition.icon}/>
      <p><strong>wind:</strong> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
    </>
  )
}


export default Country
