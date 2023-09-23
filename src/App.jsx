import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './components/Login';
import Register from './components/Register';



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <Routes>
          <Route path= '/' Component= {Login}/>
          <Route path= '/register' Component= {Register}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App
