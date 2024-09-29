import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoginPage({ onLogin }) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!email) {
            setEmailError('El correo electrónico es requerido')
        } else if (!re.test(email)) {
            setEmailError('Ingrese un correo electrónico válido')
        } else {
            setEmailError('')
        }
    }

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError('La contraseña es requerida')
        } else if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres')
        } else {
            setPasswordError('')
        }
    }

    useEffect(() => {
        setIsFormValid(!emailError && !passwordError && email !== '' && password !== '')
    }, [email, password, emailError, passwordError])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isFormValid) {
            setIsLoading(true)
            // Simular una llamada a la API
            await new Promise(resolve => setTimeout(resolve, 2000))
            setIsLoading(false)
            onLogin({ email })
            // Aquí iría la lógica real de login
            console.log('Login attempt with:', { email, password })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-4xl font-bold text-white">LOGO</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${emailError ? 'border-red-500' : ''
                                }`}
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                validateEmail(e.target.value)
                            }}
                            onBlur={() => validateEmail(email)}
                            required
                        />
                        {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${passwordError ? 'border-red-500' : ''
                                }`}
                            placeholder="******************"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                validatePassword(e.target.value)
                            }}
                            onBlur={() => validatePassword(password)}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${isFormValid && !isLoading ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                                }`}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin mx-auto" />
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}