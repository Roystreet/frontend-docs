import { useState, useEffect } from 'react'
import { Plus, Edit, Key, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "../../hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import apiRequest from '../../helper/api'

export default function UsersView() {

    const { companyId } = useParams() // Obtener companyId desde los parámetros
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false)
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '' })
    const [editingUser, setEditingUser] = useState(null)
    const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' })
    const { toast } = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await apiRequest(`companies/${companyId}/users`, 'GET')

                if (response.succes) {
                    setUsers(response.data)
                } else {
                    console.error('Error al obtener usuarios:', response.message)
                }
            } catch (error) {
                console.error('Error en la solicitud:', error)
            }
        }

        fetchUsers()
    }, [])

    const handleAddUser = async () => {
        if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.role || !newUser.password) {
            toast({
                title: "Error",
                description: "Por favor, complete todos los campos.",
                variant: "destructive",
            })
            return
        }
        if (newUser.password !== newUser.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden.",
                variant: "destructive",
            })
            return
        }

        // Preparar los datos para la solicitud
        const userData = {
            name: newUser.firstName,
            lastname: newUser.lastName,
            username: newUser.email, // Suponiendo que el email es el username
            email: newUser.email,
            password: newUser.password,
            companyId: companyId, // El ID de la empresa
        }

        try {
            // Realizar la solicitud POST para crear el usuario
            const response = await apiRequest('companies/users/create', 'POST', userData)

            if (response.succes) {
                // Agregar el usuario recién creado a la lista de usuarios
                const updatedUsers = [...users, {  id: response.data.id, name: response.data.name, lastname: response.data.lastname, email: response.data.email, active: response.data.active }]
                setUsers(updatedUsers)
                // Cerrar el diálogo y limpiar el formulario
                setIsCreateDialogOpen(false)
                setNewUser({ firstName: '', lastName: '', email: '', role: '', password: '', confirmPassword: '' })
                toast({
                    title: "Usuario creado",
                    description: response.message,
                })
            } else {
                toast({
                    title: "Error al crear usuario",
                    description: response.message,
                    variant: "destructive",
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
                variant: "destructive",
            })
            console.error("Error al crear el usuario:", error)
        }
    }

    const handleEditUser = (user) => {
        setEditingUser(user)
        setIsEditDialogOpen(true)
    }

    const handleUpdateUser = () => {
        const updatedUsers = users.map(u => u.id === editingUser.id ? editingUser : u)
        setUsers(updatedUsers)
        setIsEditDialogOpen(false)
        toast({
            title: "Usuario actualizado",
            description: "La información del usuario ha sido actualizada exitosamente.",
        })
    }

    const handleChangePassword = (userId) => {
        setEditingUser(users.find(u => u.id === userId))
        setIsChangePasswordDialogOpen(true)
    }

    const handleUpdatePassword = () => {
        if (newPassword.password !== newPassword.confirmPassword) {
            toast({
                title: "Error",
                description: "Las contraseñas no coinciden.",
                variant: "destructive",
            })
            return
        }
        setIsChangePasswordDialogOpen(false)
        setNewPassword({ password: '', confirmPassword: '' })
        toast({
            title: "Contraseña actualizada",
            description: "La contraseña del usuario ha sido actualizada exitosamente.",
        })
    }

    const filteredUsers = users?users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ): []

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="container mx-auto py-10">
            <Button
                variant="outline"
                onClick={handleGoBack}
                className="mb-4"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Usuarios</CardTitle>
                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Crear Usuario
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                                <DialogDescription>
                                    Complete los detalles del nuevo usuario aquí. Haga clic en guardar cuando termine.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="firstName" className="text-right">
                                        Nombre
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={newUser.firstName}
                                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lastName" className="text-right">
                                        Apellido
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={newUser.lastName}
                                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right">
                                        Estado
                                    </Label>
                                    <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Seleccione un rol" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="User">User</SelectItem>
                                            <SelectItem value="Manager">Manager</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="password" className="text-right">
                                        Contraseña
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="confirmPassword" className="text-right">
                                        Confirmar Contraseña
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={newUser.confirmPassword}
                                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" onClick={handleAddUser}>Guardar Usuario</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm"
                        />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Apellido</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.active ? "success" : "destructive"}>
                                            {user.active ? "Activa" : "Inactiva"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Abrir menú</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    <span>Editar Usuario</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleChangePassword(user.id)}>
                                                    <Key className="mr-2 h-4 w-4" />
                                                    <span>Cambiar Contraseña</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                        <DialogDescription>
                            Actualice los detalles del usuario aquí. Haga clic en guardar cuando termine.
                        </DialogDescription>
                    </DialogHeader>
                    {editingUser && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-firstName" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    id="edit-firstName"
                                    value={editingUser.firstName}
                                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-lastName" className="text-right">
                                    Apellido
                                </Label>
                                <Input
                                    id="edit-lastName"
                                    value={editingUser.lastName}
                                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-role" className="text-right">
                                    Rol
                                </Label>
                                <Select onValueChange={(value) => setEditingUser({ ...editingUser, role: value })} defaultValue={editingUser.role}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Seleccione un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="User">User</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdateUser}>Actualizar Usuario</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Cambiar Contraseña</DialogTitle>
                        <DialogDescription>
                            Ingrese la nueva contraseña para el usuario.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-password" className="text-right">
                                Nueva Contraseña
                            </Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword.password}
                                onChange={(e) =>
                                    setNewPassword({ ...newPassword, password: e.target.value })
                                }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirm-new-password" className="text-right">
                                Confirmar Contraseña
                            </Label>
                            <Input
                                id="confirm-new-password"
                                type="password"
                                value={newPassword.confirmPassword}
                                onChange={(e) =>
                                    setNewPassword({ ...newPassword, confirmPassword: e.target.value })
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleUpdatePassword}>Cambiar Contraseña</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
