'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'

import humidity from './img/humidity.png'

import wind from './img/wind.png'


export default function Home() {
  const api_key = '0238883e2d45f157aff7571ff2604134';
  const [city, setCity] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  async function searchFunction() {
    console.log(city)
    if (city != null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&lang={it}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData(data)
      console.log(city)

    }
  }

  const kelvin = weatherData?.main?.temp
  const celsius = Math.floor(kelvin - 273.15) + ' C°';
  let icon = null

  if (city != null || city != '') {
    icon = weatherData?.weather[0]?.main
  }
  const urlIcon = `/${icon}.png`;
  // console.log(icon, urlIcon)

  return (
    <main className={styles.main}>

      <div className={styles.container}>
        <div className={styles.card}>
          <h1>
            Weather App
          </h1>
          <div className="search">
            <form onSubmit={(e) => { e.preventDefault(); searchFunction(city) }} action="">
              <input onKeyDown={(e) => setCity(e.target.value)} type="text" name="searchInput" id={styles.cityInput} placeholder='Inserisci una città' />
              <button type="submit" id={styles.cityBtn}>Cerca</button>
            </form>

          </div>
          <div>
            <Image
              src={icon == null ? '/clear.png' : urlIcon}
              alt="clear"
              width={150}
              height={150}
              priority
            />
            <br />
            <h2 id={styles.city}>
              {city == null ? '-' : weatherData?.name}
            </h2>

            <div id={styles.temperature}>
              {kelvin == null ? '' : celsius}
            </div>

            <div className={styles.infos}>
              <div>
                <Image
                  src={wind}
                  alt="wind"
                  priority
                />
                <h3>
                  Vento
                </h3>
                <div id='wind'>
                  {kelvin == null ? '' : weatherData?.wind?.speed + ' m/s'}
                </div>
              </div>

              <div>
                <Image
                  src={humidity}
                  alt="humidity"
                  priority
                />
                <h3>
                  Umidità
                </h3>
                <div id='humidity'>
                  {kelvin == null ? '' : weatherData?.main?.humidity + ' %'}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
