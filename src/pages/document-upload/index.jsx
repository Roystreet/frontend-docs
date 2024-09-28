import { Upload} from 'lucide-react'

const DocumentUpload = () => {
    const handleFileUpload = (event) => {
        // Implement file upload logic here
        console.log('Files uploaded:', event.target.files)
      }
    
      return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Subir Documentos</h2>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT (MAX. 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileUpload} />
              </label>
            </div>
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
              <Upload size={20} className="mr-2" />
              Subir Archivos
            </button>
          </div>
        </div>
      )
}

export default DocumentUpload;