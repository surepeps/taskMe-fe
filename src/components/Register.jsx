import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRequestLoading } from '../context/LoadingContext';


function Register() {
  const {register} = useAuth();

  const { setRequestLoading } = useRequestLoading();

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRequestLoading(true)
      try {
        await register(values);
        // console.log(response)
        // toast.success("Su")
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
            <h1 className='text-2xl font-semibold pb-2'>Register</h1>
            <h3 className='text-xl'>to start tasking</h3>
          </div>
          <div className="middle">
            <form onSubmit={formik.handleSubmit} >

              <div className="w-full mb-4">
                <input type="text" value={formik.values.first_name} onBlur={formik.handleBlur} onChange={formik.handleChange} id='first_name' name='first_name' placeholder ="Femi" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.first_name && formik.errors.first_name ? (
                    <div className='text-red-500 text-sm'>{formik.errors.first_name}</div>
                  ) : null
                }
              </div>

              <div className="w-full mb-4">
                <input type="text" value={formik.values.last_name} onBlur={formik.handleBlur} onChange={formik.handleChange} id='last_name' name='last_name' placeholder ="Ebere" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.last_name && formik.errors.last_name ? (
                    <div className='text-red-500 text-sm'>{formik.errors.last_name}</div>
                  ) : null
                }
              </div>
              
              <div className="w-full mb-4">
                <input type="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' id='email' placeholder="avc@go.com" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.email && formik.errors.email ? (
                    <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                  ) : null
                }
              </div>
              <div className="w-full mb-4">
                <input type="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' id='password' placeholder="password" className='w-full border border-[#eaeaea] p-4 rounded-lg focus:outline-none text-sm text-[#333333]'/>
                {formik.touched.password && formik.errors.password ? (
                    <div className='text-red-500 text-sm'>{formik.errors.password}</div>
                  ) : null
                }
              </div>

              <div className="w-full mb-4">
                <button type='submit' className="bg-[#0016df] border border-[#0016df] text-sm text-white w-full rounded-lg py-4 hover:bg-transparent hover:text-[#0016df] transition duration-300 ease-in-out "> Register</button>
              </div>
            </form>
          </div>
          
          <p className='text-center text-md'>Already registered?
            <NavLink className='text-[#0016df] text-semibold' to='/login'>Login</NavLink>
          </p>

        </div>
    </div>
  )
}

export default Register