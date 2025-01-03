import React, { useState } from "react"
import { cdmApi } from "../../misc/cdmApi"


function ForgotPassword() {
    const [message, setMessage] = useState('');
    const handleVerifyEmail = async () => {
        try {
            setMessage("We have sent you an email with a new password!");
        } catch (error) {
            setMessage("Error reset password. Please try again.");
        }
    };
    const [mail, setMail] = useState('');
    const handleInputChange = (event) => {
        setMail(event.target.value);
    };
   
    let resetPassword ='';

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
            cdmApi.resetPassword(mail)
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
                className="mx-auto h-32 w-auto"
                src="https://res.cloudinary.com/dqfhfd7ts/image/upload/v1735749663/i3jwqxdc-removebg-preview_mj6icj.png?fbclid=IwZXh0bgNhZW0CMTEAAR12Y7OCWWYXXWSZ1yKy-J3KsomHeOk17uRYxvq9uOoFlSJC6mkYsISQSOM_aem_d7bwwVnag-bGMcdtoQpfzw"
                alt="Your Company"
                />
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email Address
                    </label>
                    <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                    <label>
                        <input className="px-4 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 bg-white" type="email" value={mail} onChange={handleInputChange} />
                    </label>
                    <button onClick={handleVerifyEmail} className="flex w-full justify-center rounded-md mt-6 bg-black px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600" type="submit">Reset your password</button>
                    </form>
        
                    </div>
                </div>
                {message && (
                <div className="mt-4 text-center text-sm text-gray-500">
                    {message}
                </div>
                )}
            </div>
        </div>
        </>
    );
}


export default ForgotPassword;