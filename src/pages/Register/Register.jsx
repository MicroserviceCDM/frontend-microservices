import React, { useState } from "react";
import "../Login/login-register.css";
import { Link } from "react-router-dom";
import Validation from "./RegisterValidation";
import { cdmApi } from "../../misc/cdmApi";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    password: "",
    confpassword: "",
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  // const clientId ="671243941248-6t9bi1aq2om20nlksbvq9amc8snso34a.apps.googleusercontent.com";

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const email = "";
  const phone = "";
  const address = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = { name, password, confpassword };
    setErrors(Validation(values));
    if (
      errors.name === "" &&
      errors.password === "" &&
      errors.confpassword === ""
    ) {
      try {
        const user = {
          name,
          email,
          phone,
          address,
          password,
          role: "CUSTOMER",
        };
        cdmApi
          .signup(user)
          .then((response) => {
            alert("Register successfully!");
            navigate("/login");
          })
          .catch((error) => {
            alert("Register failed!");
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    try {
      const name = userObject.email + "";
      const avatar = userObject.picture;
      const email = userObject.family_name + " " + userObject.given_name;
      const user = {
        avatar,
        name,
        email,
        phone,
        address,
        password: "Dat20031234",
        role: "CUSTOMER",
      };
      console.log(user);
      cdmApi
        .signup(user)
        .then((response) => {
          alert("Register successfully!");
          navigate("/login");
        })
        .catch((error) => {
          alert("Register failed!");
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "127046372503-fcf9va4r603a399qvuvnms0pk7rpug0e.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-32 w-auto"
            src="https://res.cloudinary.com/droondbdu/image/upload/v1702194603/wepik-gradient-modern-car-detail-clean-amp-repair-logo-20231210074938LRYR_dyz3ez.png"
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              {/* Exchange name and email [Security...] */}
              <input
                onChange={(e) => setName(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white"
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white"
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setConfPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white"
              />
              {errors.confpassword && (
                <span className="text-danger">{errors.confpassword}</span>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="line-horizontal mr-4 mt-2"></div>
            <p>Or</p>
            <div className="line-horizontal ml-4 mt-2"></div>
          </div>
          <div
            className="flex flex-col justify-center items-center"
            id="signInDiv"
          ></div>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold leading-6 text-black hover:text-gray-500"
          >
            Login here
          </a>
        </p>
      </div>
    </>
  );
}

export default Register;
