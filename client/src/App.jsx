import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { UsersForm } from './components/UsersForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <UsersForm/>
    </>
  )
}

export default App
