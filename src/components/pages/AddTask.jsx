import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ApiService from '../../helper/http/apiService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRequestLoading } from '../../context/LoadingContext';
import { toast } from 'react-toastify';


function AddTask({userData}) {
    const navigate = useNavigate()
    const api = new ApiService();

    const { setRequestLoading } = useRequestLoading();

  const validationSchema = Yup.object({
    task: Yup.string().required('Task name is required'),
    to_user: Yup.string().required('Assign user to Task'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
  });


  const formik = useFormik({
    initialValues: {
      task: '',
      to_user: '',
      description: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setRequestLoading(true)
      try {
        const response = await api.postWithToken('/task', values);
        toast.success(response.message);
        resetForm();
        navigate('/')
      } catch (error) {
       console.log("Error: "+ error)
      }finally{
        setRequestLoading(false)
      }
    },
  });


  return (
    <div className='max-w-screen-2xl mx-auto px-4 w-full py-14 flex gap-10 flex-col'>
      <div className="topNav bg-gray-400 py-3 px-10 rounded-lg flex justify-between items-center">
        <div className="mame">
          <h2 className='text-xl font-bold'>
            Welcome, {userData.first_name}
          </h2>
        </div>

        <div className="logout">
          <NavLink className='text-md text-red-600 font-semibold' to='/logout'>logOut</NavLink>
        </div>
      </div>

      <div className="middleCont bg-slate-200 rounded-lg py-5 px-10">
       
        <div className="tasks py-10 gap-7">
            <form onSubmit={formik.handleSubmit}>
                <div className="formT w-full mb-5">
                    <input value={formik.values.task} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name='task' id='task' placeholder='Task Name' className='w-full py-4 px-6 rounded-md focus:outline-none' />
                    {formik.touched.task && formik.errors.task ? (
                        <div className='text-red-500 text-sm'>{formik.errors.task}</div>
                    ) : null
                    }
                </div>

                <div className="formT w-full mb-5">
                    <textarea value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange} name="description" id="" cols="30" rows="10" className='w-full focus:outline-none rounded-md py-4 px-6'></textarea>
                    {formik.touched.description && formik.errors.description ? (
                        <div className='text-red-500 text-sm'>{formik.errors.description}</div>
                    ) : null
                    }
                </div>
                
                <div className="selecT w-full mb-5">
                    <select value={formik.values.to_user} onBlur={formik.handleBlur} onChange={formik.handleChange} name="to_user" id="to_user" className="w-full py-4 px-6 rounded-md focus:outline-none">
                        <option value="">Assign To</option>
                        <option value="1">SureCoder</option>
                        <option value="2">SureCoder</option>
                        <option value="3">SureCoder</option>
                        <option value="4">SureCoder</option>
                        <option value="5">SureCoder</option>
                    </select>
                    {formik.touched.to_user && formik.errors.to_user ? (
                        <div className='text-red-500 text-sm'>{formik.errors.to_user}</div>
                    ) : null
                    }
                </div>

                <div className="w-full mb-5">
                    <select value={formik.values.status} onBlur={formik.handleBlur} onChange={formik.handleChange} name="status" id="status" className="w-full py-4 px-6 rounded-md focus:outline-none">
                        <option value="">Change Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                    {formik.touched.status && formik.errors.status ? (
                        <div className='text-red-500 text-sm'>{formik.errors.status}</div>
                    ) : null
                    }
                </div>

                <div className="tt mb-5">
                    <button type='submit' className='rounded-md hover:text-green-600 hover:bg-transparent bg-green-600 border border-green-600 text-white w-full transition duration-300 ease-in-out py-4 px-5'>Add Task</button>
                </div>
            </form>
        </div>

      </div>
    </div>
  )
}

export default AddTask