import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Upload, FileText, Settings, Users, BarChart, MessageSquare, Menu, ChevronLeft } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Sidebar = () => {
    const location = useLocation()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const menuItems = [
        { icon: Upload, label: 'Subir Documentos', path: '/documents' },
        { icon: FileText, label: 'Documentos', path: '/files' },
        { icon: BarChart, label: 'Análisis', path: '/analysis' },
        { icon: Users, label: 'Usuarios', path: '/users' },
        { icon: Settings, label: 'Configuración', path: '/settings' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
    ]

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <div className={cn(
            "h-screen bg-primary text-primary-foreground p-4 space-y-4 transition-all duration-500 ease-in-out",
            isCollapsed ? "w-20" : "w-64"
        )}>
            <div className="flex justify-between items-center mb-8">
                <h1 className={cn(
                    "text-2xl font-bold transition-all duration-500 ease-in-out",
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                )}>
                    Panel Admin
                </h1>
                <Button variant="ghost" size="icon" onClick={toggleSidebar} className="transition-all duration-500 ease-in-out">
                    {isCollapsed ? <Menu className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                </Button>
            </div>
            <nav className="space-y-1">
                {menuItems.map((item, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start transition-all duration-500 ease-in-out",
                                        location.pathname === item.path && "bg-primary-foreground text-primary",
                                        isCollapsed ? "px-2" : "px-4"
                                    )}
                                >
                                    <Link to={item.path} className="flex items-center">
                                        <item.icon className={cn("h-4 w-4 transition-all duration-500 ease-in-out", isCollapsed ? "mr-0" : "mr-2")} />
                                        <span className={cn(
                                            "transition-all duration-500 ease-in-out",
                                            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                                        )}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar