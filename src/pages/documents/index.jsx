import React from 'react'
import { File, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Documents = () => {
  const documents = [
    { name: 'Documento 1.pdf', active: true },
    { name: 'Documento 2.docx', active: false },
    { name: 'Documento 3.txt', active: true },
  ]

  return (
    <Card className="w-full mt-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Documentos Subidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((file, index) => (
            <Card key={index} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-2">
                <File className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <Badge variant={file.active ? "success" : "destructive"}>
                {file.active ? (
                  <CheckCircle className="h-4 w-4 mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                {file.active ? 'Activo' : 'Inactivo'}
              </Badge>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Documents