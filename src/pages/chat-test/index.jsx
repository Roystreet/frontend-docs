import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FlaskConical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from 'react-markdown'; // Importa react-markdown
import remarkBreaks from 'remark-breaks'; // Importa remark-breaks
const baseUrl = import.meta.env.VITE_API_URL;
import apiRequest from "../../helper/api";

export default function ChatTest() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [streamingMessage, setStreamingMessage] = useState('');
    const messagesEndRef = useRef(null);
    const { documentId } = useParams();
    const [documents, setDocuments] = useState([]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, streamingMessage]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const data = await apiRequest(`documents/${documentId}`, 'GET', null);
                setDocuments(data);
            } catch (error) {
                console.error('Error al obtener los documentos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [documentId]);

    const typewriterEffect = (text, delay = 20) => {
        return new Promise((resolve) => {
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    setStreamingMessage(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, delay);
        });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        const newUserMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user'
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        setInputMessage('');
        setLoading(true);
        setStreamingMessage('');

        try {
            const response = await fetch(`${baseUrl}documents/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: inputMessage,
                    documentId: documentId
                })
            });

            if (response.ok) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullResponse = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    setLoading(false)
                    const chunk = decoder.decode(value);
                    fullResponse += chunk;
                    await typewriterEffect(chunk);
                }

                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        id: Date.now(),
                        text: fullResponse,
                        sender: 'system'
                    }
                ]);
            } else {
                console.error('Error al obtener respuesta de la API');
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        id: Date.now(),
                        text: "Lo siento, ha ocurrido un error al procesar tu consulta.",
                        sender: 'system'
                    }
                ]);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now(),
                    text: "Lo siento, ha ocurrido un error de conexión.",
                    sender: 'system'
                }
            ]);
        } finally {
            setLoading(false);
            setStreamingMessage('');
        }
    };

    const BotMessageSkeleton = () => (
        <div className="mb-4 flex justify-start items-start">
            <Avatar className="mr-2">
                <AvatarFallback>
                    <Bot className="h-5 w-5" />
                </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
            </div>
        </div>
    );

    return (
        <Card className="flex flex-col h-[calc(100vh-5rem)] m-4">
            <CardHeader className="bg-primary text-primary-foreground py-2">
                <CardTitle className="text-xl font-bold flex gap-2 items-center">
                    <FlaskConical />
                    {documents.name}
                </CardTitle>
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
                                    className={`p-2 rounded-lg max-w-[80%] ${message.sender === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                        }`}
                                >
                                    <ReactMarkdown
                                        remarkPlugins={[remarkBreaks]}
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                            li: ({ node, ...props }) => <li className="list-disc ml-5" {...props} />,
                                            // Agrega más personalizaciones según sea necesario
                                        }}
                                    >
                                        {message.text}
                                    </ReactMarkdown>
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
                        {loading && <BotMessageSkeleton />}
                        {streamingMessage && (
                            <div className="mb-4 flex justify-start">
                                <Avatar className="mr-2">
                                    <AvatarFallback>
                                        <Bot className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="p-2 rounded-lg max-w-[80%] bg-secondary text-secondary-foreground">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkBreaks]}
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                                            li: ({ node, ...props }) => <li className="list-disc ml-5" {...props} />,
                                            // Agrega más personalizaciones según sea necesario
                                        }}
                                    >
                                        {streamingMessage}
                                    </ReactMarkdown>
                                    <span className="inline-block w-1 h-4 bg-primary-foreground ml-1 animate-blink"></span>
                                </div>
                            </div>
                        )}
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
                        disabled={loading}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Enviando...' : (
                            <>
                                <Send className="h-4 w-4 mr-2" />
                                Enviar
                            </>
                        )}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
