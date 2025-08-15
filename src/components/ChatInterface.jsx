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
  const messagesEndRef = useRef(null);

  const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? window.location.origin 
    : 'http://localhost:3000';

  useEffect(() => {
    loadPersonas();
    // Check if persona is specified in URL
    const personaFromUrl = searchParams.get('persona');
    if (personaFromUrl) {
      // Will be set after personas are loaded
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
    } catch (error) {
      console.error('Failed to load personas:', error);
      if (error.code === 'ERR_NETWORK') {
        addSystemMessage('❌ Cannot connect to server. Please ensure the backend is running on port 3000.');
      } else if (error.response?.status === 500) {
        addSystemMessage('❌ Server error. Please check if your OpenAI API key is configured in the .env file.');
      } else {
        addSystemMessage(`❌ Failed to load personas: ${error.message}. Please refresh the page.`);
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
      hitesh: "Namaste! 🙏 Hitesh here! Chai aur Code ke saath aaj kya seekhna hai? React, JavaScript, ya koi aur web development topic? Main yahan hun tumhare saath - production-ready solutions banate hain! ☕️🚀",
      piyush: "Hey there! 👋 Piyush here. Ready to dive into some system design and backend engineering? Whether it's scalability, microservices, or architectural decisions - let's think about this systematically and build something robust! 🔧"
    };
    return messages[persona.id] || `Hello! I'm ${persona.name}. How can I help you today?`;
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
      let errorMessage = "Sorry, I'm having trouble responding right now. Please try again.";
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = "❌ Cannot connect to server. Please ensure the backend is running.";
      } else if (error.response?.status === 500) {
        errorMessage = "❌ Server error. Please check your OpenAI API key and try again.";
      } else if (error.response?.status === 400) {
        errorMessage = "❌ Invalid request. Please try rephrasing your message.";
      } else if (error.response?.data?.error) {
        errorMessage = `❌ ${error.response.data.error}`;
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
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/20 p-3 rounded-lg mt-2 mb-2 overflow-x-auto"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-black/20 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/\n/g, '<br>');
  };

  const sampleQuestions = [
    "How do I learn React.js as a beginner?",
    "What's the difference between useState and useReducer?",
    "How do you design a scalable chat application?",
    "Explain microservices vs monolith architecture",
    "What are React best practices?",
    "How to optimize database performance?"
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-2xl backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300">
                  <span className="text-white text-xl">☕</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Chai aur GenAI
                </h1>
                <p className="text-gray-300 text-sm font-medium">Jahan har message ek nayi kahani shuru karta hai ✨</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-2 bg-gray-800 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white font-medium">15M+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-600">
                <i className="fas fa-crown text-yellow-300"></i>
                <span className="text-xs text-white font-medium">Premium</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Bar */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 backdrop-blur-md rounded-2xl border border-gray-700 p-6 shadow-xl">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2 border border-gray-600 hover:scale-105 transition-transform duration-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-white font-medium">Real-time Chat</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2 border border-gray-600 hover:scale-105 transition-transform duration-200">
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-white font-medium">AI Assistance</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2 border border-gray-600 hover:scale-105 transition-transform duration-200">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-white font-medium">Smart Replies</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2 border border-gray-600 hover:scale-105 transition-transform duration-200">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="text-white font-medium">Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Chatting Section */}
        <div className="text-center mb-12">
          <div className="relative">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="text-5xl">💬</span> Start Your AI Journey
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Connect with our AI mentors and experience personalized conversations like never before
            </p>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Persona Selection */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 backdrop-blur-md rounded-3xl border border-gray-700 p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-users text-white text-sm"></i>
                  </span>
                  AI Mentors
                </h3>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">2 Online</div>
              </div>
              
              <div className="space-y-4">
                {personas.map((persona) => (
                  <div 
                    key={persona.id}
                    className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border ${
                      currentPersona?.id === persona.id 
                        ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-400 shadow-2xl scale-105' 
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => selectPersona(persona.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl shadow-lg ${
                          persona.id === 'hitesh' 
                            ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                            : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                        }`}>
                          {persona.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-lg">{persona.name}</h4>
                        <p className="text-sm text-white/70 mb-2">
                          {persona.id === 'hitesh' ? '🔴 Live now' : '🔴 Available'}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {persona.expertise.slice(0, 2).map((skill, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full border border-gray-600">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {currentPersona?.id === persona.id && (
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"></div>
                          <span className="text-xs text-white font-medium">Active</span>
                        </div>
                      )}
                    </div>
                    {currentPersona?.id === persona.id && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>

              
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 backdrop-blur-md rounded-3xl border border-gray-700 h-[750px] flex flex-col shadow-2xl hover:shadow-3xl transition-all duration-300">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-t-3xl">
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
                        <h3 className="text-xl font-bold text-white">Chat with {currentPersona.name}</h3>
                        <p className="text-gray-300 text-sm flex items-center">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                          Online • Responding quickly
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Choose Your AI Mentor</h3>
                        <p className="text-gray-300 text-sm">Select a mentor to start your AI conversation</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-700 rounded-full px-3 py-1 text-xs text-white font-medium border border-gray-600">
                    <i className="fas fa-shield-alt mr-1"></i>
                    Secure Chat
                  </div>
                  <button 
                    onClick={clearChat}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <i className="fas fa-trash mr-2"></i>Clear
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scrollbar bg-gradient-to-b from-transparent to-gray-800/50">
                {messages.length === 0 ? (
                  <div className="text-center text-white py-16">
                    <div className="relative mb-8">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-2xl">
                        <i className="fas fa-comments text-4xl text-white"></i>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-robot text-white text-xs"></i>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                      Welcome to Chai aur GenAI!
                    </h3>
                    <p className="text-gray-300 text-lg max-w-md mx-auto">
                      Select an AI mentor above and start your personalized conversation journey
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div key={message.id} className={`message animate-slide-up ${
                      message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                    }`}>
                      <div className={`max-w-[75%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.role === 'assistant' && currentPersona && (
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm shadow-lg ${
                              currentPersona.id === 'hitesh' 
                                ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                                : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                            }`}>
                              {currentPersona.avatar}
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white">{currentPersona.name}</span>
                              <div className="text-xs text-white/60">AI Assistant</div>
                            </div>
                          </div>
                        )}
                        <div className={`px-6 py-4 rounded-2xl shadow-lg ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white ml-auto' 
                            : 'bg-gray-800 backdrop-blur-sm text-white border border-gray-600'
                        }`}>
                          <div 
                            className="whitespace-pre-wrap leading-relaxed" 
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                        </div>
                        <div className={`text-xs text-gray-400 mt-2 flex items-center ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <i className="fas fa-clock mr-1"></i>
                          {message.timestamp}
                          {message.role === 'user' && <i className="fas fa-check ml-2 text-green-400"></i>}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-700 bg-gray-800 rounded-b-3xl">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <div className="relative">
                      <input 
                        type="text" 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={currentPersona ? `Message ${currentPersona.name}... ✨` : "Select an AI mentor to start chatting..."}
                        className="w-full px-6 py-4 bg-gray-700 backdrop-blur-sm border border-gray-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-lg transition-all duration-300 pr-12"
                        disabled={!currentPersona || isTyping}
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {isTyping ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        ) : (
                          <i className="fas fa-microphone text-gray-400 hover:text-gray-300 cursor-pointer transition-colors"></i>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="p-3 bg-gray-700 backdrop-blur-sm text-gray-400 rounded-2xl hover:bg-gray-600 hover:text-white transition-all shadow-lg border border-gray-600"
                      title="Add attachment"
                    >
                      <i className="fas fa-paperclip"></i>
                    </button>
                    <button 
                      onClick={sendMessage}
                      disabled={!currentPersona || isTyping || !inputMessage.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-medium"
                    >
                      {isTyping ? (
                        <i className="fas fa-spinner animate-spin"></i>
                      ) : (
                        <i className="fas fa-paper-plane"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span>Press Enter to send</span>
                    <span>•</span>
                    <span>Shift + Enter for new line</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-shield-alt"></i>
                    <span>End-to-end encrypted</span>
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


