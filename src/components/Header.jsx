import '../css/header.css'
import '../css/shared/global.css'

import React from 'react'

function Header() {
  return (
    <>
      <div>
        <ul className='nav-list flex'>
          <li>Credits</li>
          <li>Feedback</li>
          <li>Signin</li>
        </ul>
      </div>
    </>
  )
}

export default Header
