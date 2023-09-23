import React from 'react'
import { NavLink } from 'react-router-dom'

function NoTask() {
  return (
    <div className='py-20 flex justify-center items-center gap-6 flex-col'>
        <h2 className='text-2xl font-semibold '>Sorry No Task</h2>
        <NavLink to='/add/task' className='px-6 py-3 bg-green-700 rounded-lg text-white border border-green-600 font-medium text-md whitespace-nowrap flex items-center hover:bg-transparent hover:text-green-700 transition duration-300 ease-in-out' >Add New Task</NavLink>
    </div>
  )
}

export default NoTask