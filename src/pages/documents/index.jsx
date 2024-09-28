import { File, CheckCircle, XCircle } from 'lucide-react'

const Documents = () => {
  const documents = [
    { name: 'Documento 1.pdf', active: true },
    { name: 'Documento 2.docx', active: false },
    { name: 'Documento 3.txt', active: true },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Documentos Subidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((file, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <div className="flex items-center">
              <File size={24} className="text-blue-500 mr-2" />
              <span className="text-gray-700">{file.name}</span>
            </div>
            {file.active ? (
              <CheckCircle size={24} className="text-green-500" />
            ) : (
              <XCircle size={24} className="text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>)
}

export default Documents;