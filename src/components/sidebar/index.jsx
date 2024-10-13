import { useLocation, Link } from 'react-router-dom'
import { Upload, FileText, Settings, Users, BarChart, MessageSquare } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Sidebar = () => {
    const location = useLocation()
    const menuItems = [
        { icon: Upload, label: 'Subir Documentos', path: '/documents' },
        { icon: FileText, label: 'Documentos', path: '/files' },
        { icon: BarChart, label: 'Análisis', path: '/analysis' },
        { icon: Users, label: 'Usuarios', path: '/users' },
        { icon: Settings, label: 'Configuración', path: '/settings' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
    ]

    return (
        <div className="w-64 h-screen bg-primary text-primary-foreground p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-8">Panel Admin</h1>
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <Button
                        key={index}
                        asChild
                        variant="ghost"
                        className={cn(
                            "w-full justify-start",
                            location.pathname === item.path && "bg-primary-foreground text-primary"
                        )}
                    >
                        <Link to={item.path} className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                        </Link>
                    </Button>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar