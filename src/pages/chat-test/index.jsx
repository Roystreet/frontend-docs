import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ChatTest = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef(null)
    const { documentId } = useParams()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (inputMessage.trim() === '') return

        const newUserMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user'
        }

        setMessages(prevMessages => [...prevMessages, newUserMessage])
        setInputMessage('')

        // Simular respuesta del sistema después de 1 segundo
        setTimeout(() => {
            const systemResponse = {
                id: Date.now(),
                text: `Respuesta de prueba para: "${inputMessage}"`,
                sender: 'system'
            }
            setMessages(prevMessages => [...prevMessages, systemResponse])
        }, 1000)
    }

    return (
        <Card className="flex flex-col h-[calc(100vh-5rem)] m-4">
            <CardHeader className="bg-primary text-primary-foreground py-2">
                <CardTitle className="text-xl font-bold">Chat de Pruebas - Documento {documentId}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.sender === 'system' && (
                                    <Avatar className="mr-2">
                                        <AvatarFallback>
                                            <Bot className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={`p-2 rounded-lg max-w-[80%] ${
                                        message.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground'
                                    }`}
                                >
                                    {message.text}
                                </div>
                                {message.sender === 'user' && (
                                    <Avatar className="ml-2">
                                        <AvatarFallback>
                                            <User className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-2">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                    <Input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Escribe tu mensaje aquí..."
                        className="flex-1"
                    />
                    <Button type="submit">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}

export default ChatTest