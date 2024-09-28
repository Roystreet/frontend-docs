import { useLocation, Link } from 'react-router-dom'
import { Upload, FileText, Settings, Users, BarChart} from 'lucide-react'

const Sidebar = () => {
    const location = useLocation()
    const menuItems = [
        { icon: <Upload size={24} />, label: 'Subir Documentos', path: '/documents' },
        { icon: <FileText size={24} />, label: 'Documentos', path: '/files' },
        { icon: <BarChart size={24} />, label: 'Análisis', path: '/analysis' },
        { icon: <Users size={24} />, label: 'Usuarios', path: '/users' },
        { icon: <Settings size={24} />, label: 'Configuración', path: '/settings' },
    ]

    return (
        <div className="w-64 h-screen bg-purple-600 text-white p-4">
            <h1 className="text-2xl font-bold mb-8">Panel Admin</h1>
            {menuItems.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg cursor-pointer mb-2 ${location.pathname === item.path ? 'bg-purple-800' : 'hover:bg-purple-700'
                        }`}
                >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                </Link>
            ))}
        </div>
    )
}

export default Sidebar;