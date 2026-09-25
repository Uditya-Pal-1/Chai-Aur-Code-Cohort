import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("done")

  return (
    <>
    <div>
    <h1 className=' flex justify-center font-bold font-mono text-4xl text-red-600 p-1 m-2 flex-wrap border-2 border-blue-500 border- '>Welcome to our fontend application</h1>
    {name}
    <button className='bg-yellow-400 py-2 px-3 m-4' onClick={()=>{setName("Okay")}}>Change Name</button>
    </div>
    </>
  )
}

export default App
