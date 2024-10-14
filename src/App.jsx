import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import AuthenticatedLayout from './components/authenticated-layout'
import AuthenticatedLayoutAdmin from './components/authenticated-layout-admin'
import DocumentUpload from './pages/document-upload'
import Documents from './pages/documents'
import Analysis from './pages/analytics'
import Users from './pages/users'
import Settings from './pages/settings'
import Login from './pages/login'
import ChatTest from './pages/chat-test'
import ConfigCompany from './pages/config-company'
import CreateCompany from './pages/create-company'
import UsersCompany from './pages/user-company'

function App() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  // Verificar si el usuario está logueado mediante el token en el localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')

    if (authToken && userData) {
      const parsedUserData = JSON.parse(userData)
      setUser(parsedUserData)
      setIsAdmin(parsedUserData.isAdmin) // Detectar si el usuario es admin
    }
  }, [])

  // Detectar si el token o la información de usuario ha sido eliminada desde otra pestaña
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'authToken' && !event.newValue) {
        handleLogout()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAdmin(userData.isAdmin)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<AuthenticatedLayout onLogout={handleLogout} />}>
              <Route index element={<Navigate to="/documents" replace />} />
              <Route path="documents" element={<DocumentUpload />} />
              <Route path="files" element={<Documents />} />
              <Route path="analysis" element={<Analysis />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="chat/:documentId" element={<ChatTest />} />
              <Route path="*" element={<Navigate to="/documents" replace />} />
            </Route>

            {isAdmin && (
              <Route path="/" element={<AuthenticatedLayoutAdmin onLogout={handleLogout} />}>
                <Route path="admin" element={<ConfigCompany />} />
                <Route path="admin/create" element={<CreateCompany />} />
                <Route path="admin/:companyId/users" element={<UsersCompany />} />
              </Route>
            )}
          </>
        ) : (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
