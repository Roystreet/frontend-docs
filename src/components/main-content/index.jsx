import { Route, Routes } from 'react-router-dom'
import DocumentUpload from '../../pages/document-upload'
import DocumentList from '../../pages/documents'
import Analysis from '../../pages/analytics'
import Users from '../../pages/users'
import Settings from '../../pages/settings'


const MainContent = () => {
    return (
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/documents" element={<DocumentUpload />} />
            <Route path="/files" element={<DocumentList />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<DocumentUpload />} />
          </Routes>
        </div>
      );
}

export default MainContent;