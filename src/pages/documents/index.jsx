import React, { useEffect, useState } from 'react'
import { File, CheckCircle, XCircle, TestTube, Edit, FlaskConical, BookOpenText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import apiRequest from "../../helper/api"

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState(null)
  const [newDocumentName, setNewDocumentName] = useState('')
  const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await apiRequest('documents', 'POST', {
          companyId: userData?.companyId,
        })
        setDocuments(data)
      } catch (error) {
        console.error('Error al obtener los documentos:', error)
      } finally {
        setLoading(false)
      }
    }

    if (userData?.companyId) {
      fetchDocuments()
    } else {
      console.error('No se encontró companyId en los datos del usuario')
    }
  }, [userData?.companyId])

  const handleTest = (documentId) => {
    navigate(`/chat/${documentId}`)
  }

  const truncateName = (name) => {
    return name.length > 10 ? name.substring(0, 10) + '...' : name
  }

  const handleEdit = (document) => {
    setEditingDocument(document)
    setNewDocumentName(document.name)
    setIsEditModalOpen(true)
  }

  const handleUpdateDocument = async () => {
    try {
      const updatedDocument = await apiRequest(`documents/update-name-document`, 'POST', {
        name: newDocumentName,
        id: editingDocument.id,
      })
      setDocuments(documents.map(doc => 
        doc.id === updatedDocument.id ? updatedDocument : doc
      ))
      setIsEditModalOpen(false)
    } catch (error) {
      console.error('Error al actualizar el documento:', error)
    }
  }

  const LoadingSkeleton = () => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </Card>
  )

  return (
    <Card className="w-full mt-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex gap-2 items-center ">Base de conocimiento <BookOpenText /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array(6).fill().map((_, index) => <LoadingSkeleton key={index} />)
            : documents.map((file, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <File className="h-6 w-6 text-primary" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm font-medium cursor-pointer">
                              {truncateName(file.name)}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{file.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={file.companyId ? "success" : "destructive"}>
                        {file.companyId ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-1" />
                        )}
                        {file.companyId ? 'Activo' : 'Inactivo'}
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTest(file.id)}
                            >
                              <FlaskConical className="h-4 w-4 mr-2" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Acá te redirigimos para que pruebes la conversación con tu documento</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit(file)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar el nombre del documento</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </Card>
              ))
          }
        </div>
      </CardContent>
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
            <DialogDescription>
              Actualiza el nombre del documento aquí. Haz clic en guardar cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateDocument}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default Documents