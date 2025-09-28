import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const ChatInterface = () => {
  const [searchParams] = useSearchParams();
  const [currentPersona, setCurrentPersona] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? window.location.origin 
    : 'http://localhost:3000';

  useEffect(() => {
    loadPersonas();
    const personaFromUrl = searchParams.get('persona');
    if (personaFromUrl) {
      setTimeout(() => selectPersona(personaFromUrl), 100);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadPersonas = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/personas`);
      setPersonas(response.data);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to load personas:', error);
      setIsConnected(false);
      if (error.code === 'ERR_NETWORK') {
        addSystemMessage('🔌 Connection Error: Cannot connect to server. Please ensure the backend is running on port 3000.');
      } else if (error.response?.status === 500) {
        addSystemMessage('⚠️ Server Error: Please check if your OpenAI API key is configured properly.');
      } else {
        addSystemMessage(`❌ Failed to load AI mentors: ${error.message}. Please refresh the page.`);
      }
    }
  };

  const selectPersona = (personaId) => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;

    setCurrentPersona(persona);
    clearChat();
    addSystemMessage(getWelcomeMessage(persona));
  };

  const getWelcomeMessage = (persona) => {
    const messages = {
      hitesh: `🙏 Namaste! Hitesh here! Welcome to Chai aur Code! ☕️

I'm here to help you master web development with practical, production-ready solutions. Whether you're learning:
• **React.js & Modern JavaScript** 
• **Full-stack Development**
• **Node.js & Backend APIs**
• **Database Design & Integration**

Ask me anything about software development - from beginner concepts to advanced architectures. Let's build something amazing together! 🚀

*What would you like to learn today?*`,

      piyush: `👋 Hey there! Piyush here, ready to dive deep into system design and engineering excellence!

I specialize in helping you understand:
• **System Design & Architecture**
• **Scalable Backend Development** 
• **Microservices & Distributed Systems**
• **Database Architecture & Performance**
• **DevOps & Cloud Solutions**

Whether you're preparing for interviews, building scalable systems, or optimizing performance - I'm here to guide you through the engineering mindset and best practices.

*What system design challenge can I help you solve today?* 🔧`
    };
    return messages[persona.id] || `Hello! I'm ${persona.name}. How can I help you with software development today?`;
  };

  const addSystemMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      role: 'assistant',
      content,
      timestamp: new Date().toLocaleTimeString(),
      isSystem: true
    };
    setMessages([newMessage]);
  };

  const addMessage = (role, content, isSystem = false) => {
    const newMessage = {
      id: Date.now(),
      role,
      content,
      timestamp: new Date().toLocaleTimeString(),
      isSystem
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !currentPersona || isTyping) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message
    addMessage('user', userMessage);
    
    // Update conversation history
    const newHistory = [...conversationHistory, { role: 'user', content: userMessage }];
    setConversationHistory(newHistory);

    setIsTyping(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: userMessage,
        persona: currentPersona.id,
        conversationHistory: newHistory
      });

      const assistantResponse = response.data.response;
      addMessage('assistant', assistantResponse);
      
      // Update conversation history with assistant response
      setConversationHistory(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

    } catch (error) {
      console.error('Failed to send message:', error);
      let errorMessage = "I apologize, but I'm having trouble responding right now. This might be due to:";
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage += "\n\n🔌 **Connection Issue**: Cannot reach the server\n• Please ensure the backend is running\n• Check your internet connection";
      } else if (error.response?.status === 500) {
        errorMessage += "\n\n⚠️ **Server Error**: Internal server issue\n• The OpenAI API key might not be configured\n• Please try again in a moment";
      } else if (error.response?.status === 400) {
        errorMessage += "\n\n❌ **Request Error**: Invalid request format\n• Please try rephrasing your question\n• Make sure your message is clear";
      } else if (error.response?.data?.error) {
        errorMessage += `\n\n📝 **Error Details**: ${error.response.data.error}`;
      } else {
        errorMessage += "\n\n🔄 **General Error**: Please try again\n• Refresh the page if the issue persists\n• Contact support if problems continue";
      }
      
      addMessage('assistant', errorMessage, true);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setConversationHistory([]);
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-200 italic">$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/40 border border-gray-600 p-4 rounded-xl mt-3 mb-3 overflow-x-auto"><code class="text-green-400 text-sm">$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-black/30 border border-gray-600 px-2 py-1 rounded text-sm text-blue-300">$1</code>')
      .replace(/•\s/g, '<span class="text-orange-400">•</span> ')
      .replace(/\n/g, '<br>');
  };

  const sampleQuestions = {
    hitesh: [
      "How do I start learning React.js from scratch?",
      "What's the difference between useState and useReducer?",
      "How to build a full-stack MERN application?",
      "Best practices for React component architecture?",
      "How to handle authentication in React apps?",
      "What are React hooks and when to use them?"
    ],
    piyush: [
      "How do you design a scalable chat application?",
      "Explain microservices vs monolith architecture",
      "How to optimize database performance?",
      "What are the key principles of system design?",
      "How to handle high traffic and load balancing?",
      "Best practices for API design and versioning?"
    ]
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isTyping) {
      e.preventDefault();
      sendMessage();
    }
  };

  const insertSampleQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white text-2xl">☕</span>
                </div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 ${isConnected ? 'bg-green-400' : 'bg-red-400'} rounded-full border-2 border-white ${isConnected ? 'animate-pulse' : 'animate-ping'}`}></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Chai aur GenAI
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className={`flex items-center space-x-2 ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} px-3 py-1 rounded-full`}>
                  <div className={`w-2 h-2 ${isConnected ? 'bg-green-400' : 'bg-red-400'} rounded-full animate-pulse`}></div>
                  <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
                {currentPersona && (
                  <div className="text-gray-300">
                    Chatting with <span className="text-white font-semibold">{currentPersona.name}</span>
                  </div>
                )}
              </div>
              <button 
                onClick={clearChat}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          
          {/* Persona Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    🤖
                  </span>
                  AI Mentors
                </h3>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {personas.length} Available
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {personas.map((persona) => (
                  <div 
                    key={persona.id}
                    className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border ${
                      currentPersona?.id === persona.id 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400 shadow-2xl scale-105' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                    onClick={() => selectPersona(persona.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-lg ${
                          persona.id === 'hitesh' 
                            ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                        }`}>
                          {persona.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm">{persona.name}</h4>
                        <p className="text-xs text-gray-300 mb-1">
                          {persona.id === 'hitesh' ? 'Full-Stack Expert' : 'System Design Guru'}
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">⭐</span>
                          <span className="text-xs text-gray-300">4.9 • Online</span>
                        </div>
                      </div>
                      {currentPersona?.id === persona.id && (
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Questions */}
              {currentPersona && (
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-semibold mb-3 text-sm">Quick Start Questions:</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {sampleQuestions[currentPersona.id]?.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => insertSampleQuestion(question)}
                        className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-xs text-gray-300 hover:text-white transition-all duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl h-full flex flex-col">
              
              {/* Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 rounded-t-3xl">
                <div className="flex items-center space-x-4">
                  {currentPersona ? (
                    <>
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-lg ${
                          currentPersona.id === 'hitesh' 
                            ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                        }`}>
                          {currentPersona.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {currentPersona.name}
                        </h3>
                        <p className="text-gray-300 text-sm flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          {currentPersona.id === 'hitesh' ? 'Full-Stack Development Expert' : 'System Design Specialist'} • Online
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                        🤖
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Choose Your AI Mentor</h3>
                        <p className="text-gray-300 text-sm">Select a mentor to start your learning journey</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="bg-white/10 rounded-full px-3 py-1 text-xs text-white font-medium border border-white/20">
                    🔒 Secure Chat
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="text-center text-white py-16">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                        <span className="text-4xl">💬</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">AI</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      Welcome to Your AI Learning Experience!
                    </h3>
                    <p className="text-gray-300 text-lg max-w-md mx-auto">
                      {currentPersona 
                        ? `Start chatting with ${currentPersona.name} to accelerate your software development journey`
                        : 'Select an AI mentor above to begin your personalized learning experience'
                      }
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`message animate-fade-in ${
                      message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                    }`}>
                      <div className={`max-w-[85%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.role === 'assistant' && currentPersona && !message.isSystem && (
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-lg ${
                              currentPersona.id === 'hitesh' 
                                ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                                : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                            }`}>
                              {currentPersona.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white">{currentPersona.name}</span>
                              <div className="text-xs text-gray-400">AI Mentor</div>
                            </div>
                          </div>
                        )}
                        <div className={`px-6 py-4 rounded-2xl shadow-lg ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-auto' 
                            : message.isSystem
                            ? 'bg-red-500/20 border border-red-500/30 text-red-200'
                            : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                        }`}>
                          <div 
                            className="whitespace-pre-wrap leading-relaxed" 
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                        </div>
                        <div className={`text-xs text-gray-400 mt-2 flex items-center ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="mr-1">🕒</span>
                          {message.timestamp}
                          {message.role === 'user' && <span className="ml-2 text-green-400">✓</span>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%]">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-sm shadow-lg ${
                          currentPersona?.id === 'hitesh' 
                            ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                        }`}>
                          {currentPersona?.avatar}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white">{currentPersona?.name}</span>
                          <div className="text-xs text-gray-400">Thinking...</div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-4 rounded-2xl">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-white/10 bg-white/5 rounded-b-3xl">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentPersona ? `Ask ${currentPersona.name} about software development... 💻` : "Select an AI mentor to start chatting..."}
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg transition-all duration-300 resize-none"
                      disabled={!currentPersona || isTyping}
                      rows="1"
                      style={{ minHeight: '56px', maxHeight: '120px' }}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <div className="text-xs text-gray-400">
                        {inputMessage.length > 0 && `${inputMessage.length} chars`}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={sendMessage}
                    disabled={!currentPersona || isTyping || !inputMessage.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-medium"
                  >
                    {isTyping ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span className="text-lg">🚀</span>
                    )}
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>Press Enter to send • Shift + Enter for new line</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🔒</span>
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;