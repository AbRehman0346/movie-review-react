import '../../css/IndexPageCss/header.css'
import '../../css/shared/global.css'

import React from 'react'

function Header() {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-expand-md navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Movie Review
          </a>
        </div>

        <div className=''>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link active' aria-current='page' href='/'>
                  Credits
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link active' href='/'>
                  Feedback
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link active' href='/'>
                  Signin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
