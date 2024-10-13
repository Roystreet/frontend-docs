import { useState } from 'react'
import { Plus, Users, Settings, MoreHorizontal } from 'lucide-react'
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
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'

// Datos de ejemplo para las empresas
const companiesData = [
  { id: 1, name: 'Empresa A', adminEmail: 'admin@empresaa.com', isActive: true },
  { id: 2, name: 'Empresa B', adminEmail: 'admin@empresab.com', isActive: false },
  { id: 3, name: 'Empresa C', adminEmail: 'admin@empresac.com', isActive: true },
]

export default function CompaniesView() {
  const [companies, setCompanies] = useState(companiesData)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleAddCompany = () => {
    navigate('/admin/create')
    
  }

  const handleAddUsers = (companyId) => {
    // Lógica para agregar usuarios a una empresa
    navigate(`/admin/users`)
  }

  const handleConfigureCompany = (companyId) => {
    // Lógica para configurar una empresa
    console.log('Configurar empresa', companyId)
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.adminEmail.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Empresas</CardTitle>
          <Button onClick={handleAddCompany} classNam="cursor-pointer">
            <Plus className="mr-2 h-4 w-4 cursor-pointer" /> Agregar Nueva Empresa
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre de la Empresa</TableHead>
                <TableHead>Correo Administrador</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.id}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.adminEmail}</TableCell>
                  <TableCell>
                    <Badge variant={company.isActive ? "success" : "destructive"}>
                      {company.isActive ? "Activa" : "Inactiva"}
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
                        <DropdownMenuItem onClick={() => handleAddUsers(company.id)} className="cursor-pointer">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Agregar Usuarios</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleConfigureCompany(company.id)} className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Configurar Empresa</span>
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
    </div>
  )
}