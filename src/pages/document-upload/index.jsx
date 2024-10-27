import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "../../hooks/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom'
const URL_BASE = import.meta.env.VITE_API_URL

export default function DocumentUpload() {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const { companyId } = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (event) => {
    const files = event.target.files
    setUploading(true)
    setUploadProgress(0)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('companyId', companyId)

      try {
        const response = await fetch(`${URL_BASE}documents/upload`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          setUploadedFiles(prev => [...prev, result])
          setUploadProgress((i + 1) / files.length * 100)

          toast({
            title: "Documento subido exitosamente",
            description: `${file.name} ha sido subido correctamente.`,
          })
        } else {
          console.error('Upload failed for file:', file.name)
          toast({
            title: "Error al subir el documento",
            description: `No se pudo subir ${file.name}. Por favor, inténtalo de nuevo.`,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        toast({
          title: "Error de conexión",
          description: "Hubo un problema al conectar con el servidor. Por favor, verifica tu conexión e inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    }

    setUploading(false)
    setShowConfirmDialog(true)
  }

  const handleFinishUpload = () => {
    setShowConfirmDialog(false)
    navigate('/files')
  }
  const resetUpload = () => {
    setUploadedFiles([])
    setUploadProgress(0)
    setShowConfirmDialog(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Subir Documentos</h2>
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT (MAX. 10MB)</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt"
              aria-label="Seleccionar archivos para subir"
            />
          </label>
        </div>
        {uploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Subiendo... {Math.round(uploadProgress)}%</p>
          </div>
        )}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Archivos subidos:</h3>
            <ul className="list-disc pl-5">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm text-gray-600">{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <Button
          className="mt-4 w-full"
          onClick={() => document.getElementById('dropzone-file').click()}
          disabled={uploading}
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? 'Subiendo...' : 'Subir Archivos'}
        </Button>
      </div>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Documentos subidos exitosamente</DialogTitle>
            <DialogDescription>
              Tus documentos han sido subidos correctamente. ¿Deseas subir más documentos?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={resetUpload} variant="outline">Sí, subir más</Button>
            <Button onClick={handleFinishUpload}>No, terminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}