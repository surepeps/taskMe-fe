import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRequestLoading } from '../context/LoadingContext';
import { useAuth } from '../context/AuthContext';
 
function Login() {
  const {login} = useAuth();

  const { setRequestLoading } = useRequestLoading();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRequestLoading(true)
      try {
        await login(values);
      } catch (error) {
       console.log("Error: "+ error)
      }finally{
        setRequestLoading(false)
      }
    },
  });

  return (
    <div className='w-full h-full bg-[#fafafa] flex justify-center items-center'>
        <div className='flex flex-col w-full lg:w-[537px] rounded-xl gap-5 bg-[#ffffff] px-10 py-12 border border-[#d6d6d6]'>
          <div className="top">
            <h1 className='text-2xl font-semibold pb-2'>Login</h1>
            <h3 className='text-xl'>to get started</h3>
          </div>
          <div className="middle">
            <form onSubmit={formik.handleSubmit}>
              
              <div className="w-full mb-4">
                <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' placeholder ="avc@go.com" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                  ) : null
                }
              </div>

              <div className="w-full mb-4">
                <input type="password" name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder ="type password" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.password && formik.errors.password ? (
                    <div className='text-red-500 text-sm'>{formik.errors.password}</div>
                  ) : null
                }
              </div>

              <NavLink className='mb-4 block'>Forgot password?</NavLink>
              <div className="w-full mb-4">
                <button type='submit' className="bg-[#0016df] border border-[#0016df] text-sm text-white w-full rounded-lg py-4 hover:bg-transparent hover:text-[#0016df] transition duration-300 ease-in-out "> Login</button>
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