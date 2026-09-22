import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("done")

  return (
    <>
    <h1>Welcome to our fontend application</h1>
    {name}
    <button onClick={()=>{setName("Okay")}}>Change Name</button>
    </>
  )
}

export default App
