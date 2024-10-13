import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "../../hooks/use-toast"

export default function LoginPage({ onLogin }) {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const { toast } = useToast()

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
            toast({
                title: "Inicio de sesión exitoso",
                description: "Bienvenido de vuelta!",
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center mb-8">
                        <div className="w-32 h-32 bg-gradient-to-r from-primary to-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-4xl font-bold text-background">LOGO</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    validateEmail(e.target.value)
                                }}
                                onBlur={() => validateEmail(email)}
                                required
                            />
                            {emailError && <p className="text-destructive text-sm">{emailError}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="******************"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    validatePassword(e.target.value)
                                }}
                                onBlur={() => validatePassword(password)}
                                required
                            />
                            {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Iniciar Sesión
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}