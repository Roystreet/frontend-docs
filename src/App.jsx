import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AuthenticatedLayout from './components/authenticated-layout'
import DocumentUpload from './pages/document-upload'
import Documents from './pages/documents'
import Analysis from './pages/analytics'
import Users from './pages/users'
import Settings from './pages/settings'
import Login from './pages/login'
import ChatTest from './pages/chat-test'


function App() {

  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <Routes>
        {user ? (
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route index element={<Navigate to="/documents" replace />} />
            <Route path="documents" element={<DocumentUpload />} />
            <Route path="files" element={<Documents />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="chat/:documentId" element={<ChatTest />} />
            <Route path="*" element={<Navigate to="/documents" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
