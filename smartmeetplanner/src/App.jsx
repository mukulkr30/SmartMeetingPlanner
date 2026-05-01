import { useState } from 'react'
import './App.css'
import Header from './compoonents/Header/Header'
import Footer from './compoonents/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  return (
    <>
      <Header token={token} setToken={setToken} />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
