import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router"
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
