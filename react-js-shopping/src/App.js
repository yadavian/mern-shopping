import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import RootRouter from './routers/RootRouter'

const App = () => {
  return (
    <BrowserRouter>
      <RootRouter />
    </BrowserRouter>
  )
}

export default App
