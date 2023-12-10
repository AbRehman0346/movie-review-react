import React from 'react'
import '../../css/IndexPageCss/Hero.css'

function Hero() {
  return (
    <>
      <div className='background-image'>
        <div className='search-box'>
          <input type='text' placeholder='Search' />
          <button className='roundedButton'>Search</button>
        </div>
      </div>
    </>
  )
}

export default Hero
