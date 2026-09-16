import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'

const App = () => {
  let authUser = null;

  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>

        <Route
        path='/'
        element={authUser ? <HomePage /> : <Navigate to='/login' />}
        />

        <Route
        path='/login'
        element={ !authUser ? <LoginPage/> : <Navigate to='/'/>}
        />

        <Route
        path='/signup'
        element={!authUser ? <SignupPage/> : <Navigate to='/'/>}
        />

      </Routes>
      
    </div>
  )
}

export default App