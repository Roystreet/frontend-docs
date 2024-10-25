import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const knowledgeBases = [
  { id: 1, title: 'Docker', description: 'Container platform for developers and IT operations' },
  { id: 2, title: 'Kubernetes', description: 'Open-source container orchestration system' },
  { id: 3, title: 'React', description: 'JavaScript library for building user interfaces' },
  { id: 4, title: 'Node.js', description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine' },
  { id: 5, title: 'Python', description: 'High-level programming language for general-purpose programming' },
  { id: 6, title: 'Machine Learning', description: 'Study of computer algorithms that improve automatically through experience' },
]

export default function KnowledgeBaseExplorer() {
  const [selectedKB, setSelectedKB] = useState(null)
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleKBSelect = (kb) => {
    setSelectedKB(kb)
    setQuery('')
    setResponse('')
  }

  const handleQuerySubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResponse('') // Clear previous response
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    const newResponse = `This is a sample response for the query "${query}" about ${selectedKB.title}.`
    setResponse(newResponse)
    setQuery('') // Clear input after response
    setIsLoading(false)
  }

  const handleBack = () => {
    if (response) {
      setResponse('')
    } else if (selectedKB) {
      setSelectedKB(null)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Company Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold">Knowledge Base Explorer</h1>
        </div>
        {(selectedKB || response) && (
          <Button variant="outline" onClick={handleBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {response ? 'Volver a la consulta' : 'Volver a los temas'}
          </Button>
        )}
      </nav>
      
      <ScrollArea className="flex-grow">
        <div className="p-4">
          {!selectedKB ? (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Escoge el tópico del cual quieres saber</CardTitle>
                  <CardDescription>
                    Selecciona una fuente de conocimiento para comenzar
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {knowledgeBases.map((kb) => (
                  <Card key={kb.id} className="cursor-pointer hover:bg-secondary transition-colors" onClick={() => handleKBSelect(kb)}>
                    <CardHeader>
                      <CardTitle>{kb.title}</CardTitle>
                      <CardDescription>{kb.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="mt-2">
                        Explorar <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{selectedKB.title} Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuerySubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder={`Por favor realiza tu consulta sobre ${selectedKB.title}`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full"
                  />
                  <Button type="submit" disabled={isLoading || !query.trim()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      'Enviar Consulta'
                    )}
                  </Button>
                </form>
                {isLoading && (
                  <Card className="mt-4">
                    <CardContent className="flex items-center justify-center p-4">
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      <p>Nuestros ejecutivos están resolviendo su consulta...</p>
                    </CardContent>
                  </Card>
                )}
                {response && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Respuesta</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{response}</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}