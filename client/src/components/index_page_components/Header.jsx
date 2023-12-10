import React from "react";
import userStore from "../../user_redux/user";
import { Link } from "react-router-dom";
import { RoutePaths } from "../../xnavigate";
import auth from "../../services/mongodb_auth.js";

function Header() {
  const login = () => {
    if (userStore.getState().email)
      return (
        <>
          <li className='nav-item mr-3 cursor-pointer'>
            <Link to={RoutePaths.ROOT} className='link-style-none'>
              Feedback
            </Link>
          </li>
          <li className='navbar-bg mr-3 cursor-pointer'>
            <Link to={RoutePaths.MANAGE} className='link-style-none'>
              Manage
            </Link>
          </li>
          <li className='navbar-bg mr-3 cursor-pointer'>
            <button
              id='logout-button'
              className='link-button'
              onClick={() => {
                auth.logout();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </li>
        </>
      );
    else
      return (
        <li className='nav-item'>
          <Link to={RoutePaths.LOGIN} className='link-style-none mr-3 font-2'>
            Login
          </Link>
        </li>
      );
  };
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-expand-md navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand font-28' href='/'>
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
              {/* Condition */}
              {login()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
