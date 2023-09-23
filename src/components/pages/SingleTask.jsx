import React from 'react'

function SingleTask({taskData}) {
  return (
    <div className='w-full border border-black border-dashed py-3 px-4 rounded-md cursor-pointer'>
        <div className="taskD">
            <h3 className="text-xl">{taskData.task}</h3>
            <p className="desc">{taskData.description}</p>
            <p className='py-3 font-bold text-red-500'>Assigned To: Surecoder</p>
        </div>
        <div className="btns flex justify-between px-5 pt-5">
            <i className="fa-solid fa-trash text-lg text-red-600"></i>
            <i className="fa-solid fa-pen-to-square text-lg text-green-600"></i>
        </div>
    </div>
  )
}

export default SingleTask