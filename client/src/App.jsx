import './App.css'
import Dashboard from './components/dashboard'
import Login from './components/login'
import Register from './components/register'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Register />} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
