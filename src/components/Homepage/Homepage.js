import React, { Fragment, useState } from 'react'

import './homepage.css'
const Homepage = () => {
  const [cardStyle, setCardStyle] = useState(false)

  const [info, setinfo] = useState(null)
  const [formValue, setFormValue] = useState('')
  const [data, setData] = useState(false)

  const card = () => {
    if (cardStyle) {
      return {
        visibilty: 'visible',
        transform: 'translateY(50px)',
        transitionProperty: 'transform',
        transitionDuration: '1s',
      }
    } else {
      return { visibilty: 'visible', transform: 'translateY(300px)' }
    }
  }
  const onClick = async (e) => {
    e.preventDefault()

    // setData(true);
    // setCardStyle(true);
    // console.log(e);
    // console.log(e.target.id);
    if (e.target && e.target.id === 'sub') {
      //   const res = await fetch('http://localhost:5000/city/' + formValue)
      const res = await fetch('/city/' + formValue)
      //   console.log(res)
      if (res.status === 200) {
        const data = await res.json()
        // console.log(data)
        setData(data)
        setCardStyle(true)
      }
    }
    if (e.target && e.target.id === 'coord') {
      const coord = async (p) => {
        const lat = p.coords.latitude
        const lon = p.coords.longitude

        const response = await fetch(`/pos/${lat}/${lon}`)

        const data = await response.json()
        setData(data)
        setCardStyle(true)
      }
      const loc = () => {
        if (navigator.geolocation) {
          return navigator.geolocation.getCurrentPosition(coord)
        }
      }
      loc()
    }
    // console.log(formValue);
  }
  // console.log(data);
  return (
    <div className='main-header'>
      <div className='header-container'>
        <div className='header-content'>
          <form>
            <input
              className='city-inp'
              onChange={(e) => setFormValue(e.target.value)}
              value={formValue}
              type='text'
              placeholder='CITY NAME'
            />
            <div className='btns'>
              <button
                type='submit'
                onClick={onClick}
                id='sub'
                className='btn inp'>
                Submit City
              </button>
              <button
                type='submit'
                id='coord'
                onClick={onClick}
                className='btn loc'>
                Current Location
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='info-container'>
        <div style={card()} className='info-content'>
          {data ? (
            <Fragment>
              <div className='card-body'>
                <h5 className='card-title' />
                <h6 className='card-subtitle'>{data.name}</h6>
                <p className='card-text'>
                  temparature is {data.main.temp} and max temp is{' '}
                  {data.main.temp_max},
                </p>
                <p className='card-text'>
                  humidity is {data.main.humidity} and pressure is
                  {data.main.pressure}
                </p>
                <div className='c-link'>
                  <button className='card-link'>More Info</button>
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Homepage
