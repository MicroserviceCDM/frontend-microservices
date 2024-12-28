import React from 'react'
import { useState } from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'


const NavBar = () => {
    const [isActiveNav, setIsActiveNav] = useState(false);
    
    const toggleNav = () => {
        setIsActiveNav(!isActiveNav);
    }
    
    return (
    <div className='text-black flex items-center h-24 mx-auto px-8'>
        <h1 className='text-3xl font-bold ml-20 max-lg:ml-2 flex-1 text-amber-500 hover:pointer'>CDMA.</h1>
        <ul className='flex max-lg:hidden justify-center flex-1 '>
            <li className='p-4 font-medium hover:bg-gray-700 hover:rounded-md cursor-pointer hover:text-white'>Home</li>
            <li className='p-4 font-medium hover:bg-gray-700 hover:rounded-md cursor-pointer hover:text-white'>About</li>
            <li className='p-4 font-medium hover:bg-gray-700 hover:rounded-md cursor-pointer hover:text-white'>Vehicle</li>
            <li className='p-4 font-medium hover:bg-gray-700 hover:rounded-md cursor-pointer hover:text-white'>Contact</li>
        </ul>
        
       <div className='flex justify-center ml-16 min-w-[300px] flex-1'>
            <button className='bg-[#5E5B5B] hover:bg-[#9a8f8f] hover:text-black rounded-md text-white font-medium w-[120px] lg:mx-8 mx-2 my-6 py-2 min-w-[120px]'>Register</button>
            <button className='bg-[#8ecdd5] hover:bg-[#4da8b2] hover:text-white rounded-md text-black font-medium w-[120px] lg:mx-8 mx-2 my-6 py-2 min-w-[120px]'>Sign In</button>
       </div>


        <div onClick={toggleNav}>
           {!isActiveNav ? <AiOutlineMenu className='lg:hidden text-2xl hover:bg-gray-500 mx-6'/> : <AiOutlineClose className='lg:hidden text-2xl hover:bg-gray-500 mx-6'/>}
        </div>
            <ul className={isActiveNav ? 'fixed z-10 p-4 top-0 left-0 w-[35%] h-full uppercase bg-[#cddacd] lg:hidden ease-in-out duration-300 ' : 'fixed top-0 left-[-100%] ' }>
                <li className='p-4 border-b border-b-gray-600 font-medium hover:cursor-pointer hover:text-slate-400'>Home</li>
                <li className='p-4 border-b border-b-gray-600 font-medium hover:cursor-pointer hover:text-slate-400'>About</li>
                <li className='p-4 border-b border-b-gray-600 font-medium hover:cursor-pointer hover:text-slate-400'>Vehicle</li>
                <li className='p-4 border-b border-b-gray-600 font-medium hover:cursor-pointer hover:text-slate-400'>Contact</li>
            </ul>       
    </div>
  )
}

export default NavBar