import { Link, useNavigate } from "react-router-dom";
import Auth from "../services/mongodb_auth.js";
import userStore from "../user_redux/user";
import * as actionTypes from "../user_redux/actionTypes";
import * as nav from "../xnavigate.js";

function Login(saveRoute = false) {
  const navigate = useNavigate();
  return (
    <div className='d-flex flex-column justify-content-center align-items-center height-100vh'>
      <div
        className='d-flex flex-column justify-content-sb align-items-center height-70vh bg-white '
        id='login-page-main-box'
      >
        <div className='upper mt-5'>
          <h1>Login</h1>
        </div>
        <div className='middle d-flex flex-column justify-content-center align-items-center'>
          <div className='m-2 full-width d-flex justify-content-center'>
            <input
              id='email'
              className='font-normal login-page-input-fields'
              type='email'
              placeholder='Email OR Phone'
            />
          </div>
          <div className='m-2 full-width d-flex justify-content-center '>
            <input
              id='password'
              className='font-normal login-page-input-fields'
              type='password'
              placeholder='Password'
            />
          </div>
          <button
            className='btn m-3 p-1 navbar-bg text-white'
            id='login-page-submit-button'
            type='submit'
            onClick={() => {
              let username = document.getElementById("email").value;
              let password = document.getElementById("password").value;

              if (username && password) {
                Auth.login(username, password)
                  .then((data) => {
                    if (data.status) {
                      if (saveRoute) {
                        navigate(-1);
                      } else {
                        navigate(nav.RoutePaths.ROOT);
                      }

                      userStore.dispatch(
                        actionTypes.addUser(data.email, data.token)
                      );
                    } else {
                      alert("Wrong username OR Password ");
                    }
                  })
                  .catch((error) => {
                    console.log(`Error Occured During login\n Error ${error}`);
                  });
              } else {
                alert("Enter Username or Password");
              }
            }}
          >
            LOGIN
          </button>
        </div>

        <div className='lower d-flex align-items-center mb-5'>
          <Link
            id='login-page-register-button'
            to={nav.RoutePaths.REGISTER}
            className='text-decoration-none'
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
