import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useParams } from 'react-router-dom'

const ChatTest = () => {
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const messagesEndRef = useRef(null)
    const documentId = useParams().documentId

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
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-purple-600 text-white p-4">
                <h1 className="text-2xl font-bold">Chat de Pruebas</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-300 text-gray-800'
                                }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="bg-white p-4 flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                    type="submit"
                    className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                    <Send size={24} />
                </button>
            </form>
        </div>
    )
}

export default ChatTest;