import React, { useState } from "react"
import './login-register.css'
import { Link } from "react-router-dom" 
import Validation from "./LoginValidation"
import { useNavigate } from 'react-router-dom';
import { cdmApi } from "../../misc/cdmApi";
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useEffect } from 'react';
import { MoonLoader } from "react-spinners";
import Loading from "../../components/Loading";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

function Login() {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleNavigate = async() => {
        const userData = await cdmApi.getUserMe(email);
            if (userData.data.role === "MANAGER") navigate('/managerhome');
            else if (userData.data.role === "STAFF") navigate('/staffhome'); 
            else
            navigate('/customerhome');

            window.location.reload();
            localStorage.setItem('currentUser', JSON.stringify(userData.data));
    }
    useEffect(() => {
        if(!loading)
            return;
        const timeoutId = setTimeout(() => {
            setLoading(false);
          }, 3000);
          return () => clearTimeout(timeoutId);
      }, [loading]);

      useEffect(() => {
        if(!loading)
            return;
        const timeoutId = setTimeout(() => {
            handleNavigate();
          }, 3000);
          return () => clearTimeout(timeoutId);
      }, [loading]);

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const clientId ="671243941248-6t9bi1aq2om20nlksbvq9amc8snso34a.apps.googleusercontent.com";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const phone = "";
    const address = "";
    
    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        const email = userObject.email + '';
        try {
            const user = { email , password: 'Dat20031234'};
            console.log(user);
            cdmApi.authenticate(user)
            .then(async response => { 
                console.log(response);
                if(response.data){
                    localStorage.setItem("accessToken", response.data);
                    const userData = await cdmApi.getUserMe(email);
                    if (userData.data.role === "MANAGER") {
                        navigate('/managerhome');
                    }
                    else if (userData.data.role === "STAFF") {
                        navigate('/staffhome'); 
                    }
                    else{
                        navigate('/customerhome');
                    }
                    localStorage.setItem('currentUser', JSON.stringify(userData.data));
                }
            })
            .catch(error => {
                setSnackbar({ children: "Sign in fail!", severity: "error" });
                console.log(error);
            })
        }
        catch(error) {
            console.log(error);
        }
            
    }
    
    useEffect(() => {
      /* global google */ 
        google.accounts.id.initialize({
            client_id: '127046372503-fcf9va4r603a399qvuvnms0pk7rpug0e.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: "outline", size: "large"}
        );
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const values = { email, password };
        setErrors(Validation(values));

        if(errors.password === "" && errors.email === ""){
        try {
            const user = { email, password};
            cdmApi.authenticate(user)
            .then(async response => {         
                setLoading(true);
                console.log(response);
                localStorage.setItem("accessToken", response.data);
            })
            .catch(error => {
                setSnackbar({ children: "Sign in fail!", severity: "error" });
                console.log(error);
            })
        }
        catch(error) {
            console.log(error);
        }
    }
    }


    return (
        <>
            {loading && <Loading setOpenModal={setLoading} />}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                className="mx-auto h-32 w-auto"
                src="https://res.cloudinary.com/droondbdu/image/upload/v1702194603/wepik-gradient-modern-car-detail-clean-amp-repair-logo-20231210074938LRYR_dyz3ez.png"
                alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                    </label>
                    <div className="mt-2">
                    <input onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white"
                    />
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </div>
    
                <div>
                    <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="/login/forgotpassword" className="font-semibold text-black hover:text-gray-500">
                        Forgot password?
                        </a>
                    </div>
                    </div>
                    <div className="mt-2">
                    <input onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white"
                    />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                </div>
    
                <div>
                    <button onClick={handleSubmit}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                    Sign in
                    </button>
                </div>
                <div className="flex justify-center items-center">
                            <div className="line-horizontal mr-4 mt-2"></div>
                            <p>Or</p>
                            <div className="line-horizontal ml-4 mt-2"></div>
                        </div>
                        <div className="flex flex-col justify-center items-center" id='signInDiv'>
                        </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500">
                Don't have account?{' '}
                <a href="/register" className="font-semibold leading-6 text-black hover:text-gray-500">
                    Register here
                </a>
                </p>
            </div>
            </div>
            {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
      </>
    )
}

export default Login;