import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import api from '../api/axios';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            // Simulate AI response or call actual endpoint
            // const response = await api.post('/chat/message', { message: input });
            // const botMsg = { id: Date.now() + 1, text: response.data.reply, sender: 'bot' };

            // Mock response for now as endpoint might need specific setup
            setTimeout(() => {
                const botMsg = { id: Date.now() + 1, text: "I'm a demo bot. I can help you with bookings!", sender: 'bot' };
                setMessages(prev => [...prev, botMsg]);
            }, 1000);

        } catch (error) {
            console.error("Chat failed", error);
        }
    };

    return (
        <div className="chat-widget">
            {!isOpen && (
                <button className="chat-toggle-btn" onClick={toggleChat}>
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>Garavel Assistant</h3>
                        <button onClick={toggleChat} className="close-btn">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="chat-input-form">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button type="submit">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
