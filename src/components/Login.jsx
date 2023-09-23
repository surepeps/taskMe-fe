import React from 'react'
import { NavLink } from 'react-router-dom'

function Login() {
  return (
    <div className='w-full h-full bg-[#fafafa] flex justify-center items-center'>
        <div className='flex flex-col w-full lg:w-[537px] rounded-xl gap-5 bg-[#ffffff] px-10 py-12 border border-[#d6d6d6]'>
          <div className="top">
            <h1 className='text-xxl'>Login</h1>
            <h3 className='text-xl'>to get started</h3>
          </div>
          <div className="middle">
            <form action="">
              
              <div className="w-full mb-4">
                <input type="email" placeholder ="avc@go.com" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
              </div>
              <div className="w-full mb-4">
                <input type="email" placeholder ="type password" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
              </div>

              <NavLink className='mb-4 block'>Forgot password?</NavLink>
              <div className="w-full mb-4">
                <button className="bg-[#0016df] border-[#0016df] text-sm text-white w-full rounded-lg py-4 hover:bg-transparent hover:text-[#0016df] transition duration-300 ease-in-out "> Login</button>
              </div>
            </form>
          </div>
          
          <p className='text-center text-md'>New user?
            <NavLink className='text-[#0016df] text-semibold' to='/register'>Register</NavLink>
          </p>

        </div>
    </div>
  )
}

export default Login