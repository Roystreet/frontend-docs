import React from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const NavAdmin = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Aquí iría la lógica para cerrar sesión
        // Por ejemplo, limpiar el token de autenticación del localStorage
        localStorage.removeItem('authToken')
        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login')
    }

    return (
        <nav className="bg-primary text-primary-foreground shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="font-bold text-xl">NexoDocs</span>
                    </div>
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                        >
                            <LogOut className="h-5 w-5 mr-2" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavAdmin