import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import NoTask from './NoTask'
import SingleTask from './SingleTask'
import ApiService from '../../helper/http/apiService'
import { responseCatcher } from '../../helper/http/response'


function Dashboard({userData}) {
  const [allTasks, setAllTasks] = useState(null);

  const api = new ApiService();

  const userId = userData._id;
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.getWithToken(`/task/${userId}`);
        setAllTasks(response.tasks)
      } catch (error) {
        responseCatcher(error)
      }
    }
    getTasks();
  },[])

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
        <div className="search flex justify-between gap-3">
          <input type="text" placeholder='Search For Task' className='w-full py-3 px-7 focus:outline-none rounded-md' />
          <NavLink to='/add/task' className='px-4 bg-green-700 rounded-lg text-white border border-green-600 font-medium text-md whitespace-nowrap flex items-center hover:bg-transparent hover:text-green-700 transition duration-300 ease-in-out' >Add New Task</NavLink>
        </div>


        <div className="tasks  py-10 gap-7">
          {
            !allTasks || !allTasks.length ? <NoTask /> : <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4'>{allTasks.map(task => <SingleTask key={task._id} taskData={task}/>)  }</div>
          }
        </div>

      </div>
    </div>
  )
}

export default Dashboard