import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar'
import MainContent from './components/main-content'
import './App.css'

function App() {

  return (
    <>
      <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <MainContent />
      </div>
    </Router>
    </>
  )
}

export default App
