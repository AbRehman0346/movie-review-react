import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/test.jpg";
import Auth from "../services/mongodb_auth.js";
import * as nav from "../xnavigate";
import ProfileImage from "../components/profile_image";
import * as fun from "../functions/general_functions";
import { useState } from "react";

function RegisterPage() {
  let [useimage, setimage] = useState();
  let navigate = useNavigate();
  const textFieldClasses = "w80p p-2 font-normal m-2";

  const register = () => {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmpassword").value;
    if (password === confirmPassword) {
      const data = {
        pic: useimage,
        firstname,
        lastname,
        email,
        phone,
        password,
      };
      Auth.register(data);
      navigate(nav.RoutePaths.LOGIN);
    } else {
      alert("Passwords don't match!");
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center full-width full-height'>
      <div
        className='d-flex flex-column justify-content-center align-items-center'
        id='register-page-sec-div'
      >
        {/* Rounded Image */}
        <div>
          <button
            className='link-button'
            onClick={async () => {
              const [fileHandle] = await window.showOpenFilePicker();
              const file = await fileHandle.getFile();
              const imageUrl = URL.createObjectURL(file);
              document.getElementById("rounded_profile_image_component").src =
                imageUrl;
              const base64Image = await fun.processImage(file);
              if (base64Image) setimage(base64Image);
            }}
          >
            <ProfileImage />
          </button>
        </div>
        <input
          id='firstname'
          className={textFieldClasses}
          type='text'
          placeholder='First Name'
        />
        <input
          id='lastname'
          className={textFieldClasses}
          type='text'
          placeholder='Last Name'
        />

        <input
          id='phone'
          className={textFieldClasses}
          type='number'
          placeholder='Phone'
        />

        <input
          id='email'
          className={textFieldClasses}
          type='email'
          placeholder='Email'
        />

        <input
          id='password'
          className={textFieldClasses}
          type='password'
          placeholder='Password'
        />

        <input
          id='confirmpassword'
          className={textFieldClasses}
          type='password'
          placeholder='Confirm Password'
        />

        <button
          id='register-page-register-button'
          onClick={register}
          className='btn bg-primary_ w50p m-3 color-white'
          type='submit'
        >
          Register
        </button>

        <Link
          to={nav.RoutePaths.LOGIN}
          className='text-decoration-none'
          id='register-page-login-button'
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
