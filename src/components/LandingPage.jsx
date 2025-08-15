import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const personas = [
    {
      id: 'hitesh',
      name: 'Hitesh Choudhary',
      avatar: '👨‍💻',
      description: 'Passionate educator and YouTuber specializing in web development, React, and modern JavaScript',
      expertise: ['React.js', 'JavaScript', 'Node.js', 'Full-stack Development', 'Teaching', 'Web Development'],
      signature: 'Chai aur Code',
      color: 'from-orange-500 to-yellow-500',
      website: 'https://hitesh.ai/'
    },
    {
      id: 'piyush',
      name: 'Piyush Garg',
      avatar: '🚀',
      description: 'Software engineer and content creator focused on system design, backend development, and scalable architectures',
      expertise: ['System Design', 'Backend Development', 'Microservices', 'Database Design', 'Scalability', 'Software Architecture'],
      signature: 'Engineering Best Practices',
      color: 'from-blue-500 to-indigo-500',
      website: 'https://www.piyushgarg.dev/'
    }
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Personas',
      description: 'Advanced LLM technology that captures unique communication styles and expertise'
    },
    {
      icon: '💬',
      title: 'Natural Conversations',
      description: 'Context-aware responses that maintain conversation flow and personality'
    },
    {
      icon: '🎯',
      title: 'Domain Expertise',
      description: 'Each persona specializes in their known areas of expertise and teaching style'
    },
    {
      icon: '🔄',
      title: 'Seamless Switching',
      description: 'Easily switch between personas to get different perspectives on topics'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl">☕</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Chai aur GenAI</h1>
                
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>2 Active Chats</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trust Badge */}
      <div className="text-center py-6">
        <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>Trusted by 1.5M Chat Enthusiasts</span>
        </div>
      </div>
{/* Hero Section */}
<section className="text-center py-20 px-4 bg-[#0A0E1A]">
  <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
    Chai aur <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400 underline decoration-orange-500 decoration-4">GenAI</span>
  </h1>

  <p className="text-xl md:text-2xl text-orange-400 font-medium mb-6">
  "Where chai-time vibes meet the power of AI conversations."
  </p>

  

  {/* Feature Badges */}
  <div className="flex flex-wrap justify-center gap-3 mb-12">
    <span className="flex items-center gap-2 border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-sm hover:bg-orange-500/10 transition">
      <i className="fas fa-users"></i> Real-time chat
    </span>
    <span className="flex items-center gap-2 border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-sm hover:bg-orange-500/10 transition">
      <i className="fas fa-robot"></i> AI assistance
    </span>
    <span className="flex items-center gap-2 border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-sm hover:bg-orange-500/10 transition">
      <i className="fas fa-bolt"></i> Instant messaging
    </span>
    <span className="flex items-center gap-2 border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-sm hover:bg-orange-500/10 transition">
      <i className="fas fa-star"></i> Smart replies
    </span>
    <span className="flex items-center gap-2 border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-sm hover:bg-orange-500/10 transition">
      <i className="fas fa-heart"></i> Community
    </span>
  </div>

  {/* CTA Button */}
  <Link
    to="/chat"
    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
  >
    <i className="fas fa-code"></i> Start Chatting
  </Link>
</section>


      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Why Choose Persona AI?</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Advanced AI technology meets authentic personality replication for an unparalleled chatbot experience
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personas Section */}
      <section id="personas" className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our AI Personas</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Each persona is carefully crafted to replicate authentic communication styles and expertise
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {personas.map((persona) => (
            <div key={persona.id} className="bg-gray-800 rounded-xl border border-gray-700 p-8 hover:bg-gray-750 transition-colors">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${persona.color} rounded-2xl flex items-center justify-center text-2xl`}>
                  {persona.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
                  <p className="text-gray-400">{persona.signature}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{persona.description}</p>
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Expertise Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.expertise.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <Link 
                  to={`/chat?persona=${persona.id}`} 
                  className={`flex-1 py-3 text-center bg-gradient-to-r ${persona.color} text-white rounded-lg hover:opacity-90 transition-all font-semibold`}
                >
                  Chat with {persona.name.split(' ')[0]}
                </Link>
                <a 
                  href={persona.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Conversations Preview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">See It In Action</h2>
          <p className="text-gray-400 text-lg">Sample conversations showcasing each persona's unique style</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hitesh Sample */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                👨‍💻
              </div>
              <span className="text-white font-semibold">Hitesh Choudhary</span>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-gray-300 text-sm"><strong>You:</strong> How do I learn React.js?</p>
              </div>
              <div className="bg-orange-500/20 rounded-lg p-3">
                <p className="text-gray-100 text-sm">
                  <strong>Hitesh:</strong> Arre yaar, React seekhna bilkul simple hai! 🎉 Pehle JavaScript Foundation clear karo, phir components se start karo. Chai aur code ke saath daily practice karte raho!
                </p>
              </div>
            </div>
          </div>

          {/* Piyush Sample */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                🚀
              </div>
              <span className="text-white font-semibold">Piyush Garg</span>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-gray-300 text-sm"><strong>You:</strong> How to design scalable systems?</p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-3">
                <p className="text-gray-100 text-sm">
                  <strong>Piyush:</strong> Great question! Let's think about this systematically. We need to consider horizontal scaling, load balancing, and database sharding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience AI Personalities?</h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Start chatting with Hitesh and Piyush AI personas. Get personalized responses that match their unique teaching styles.
        </p>
        <Link 
          to="/chat" 
          className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
        >
          <i className="fas fa-code"></i>
          <span>Start Chatting</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                ☕
              </div>
              <span className="text-white font-semibold">Chai aur GenAI</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://hitesh.ai/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                Hitesh.ai
              </a>
              <a href="https://www.piyushgarg.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                PiyushGarg.dev
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center text-gray-500 text-sm">
            Made with ❤️ for the developer community. Inspired by Hitesh Choudhary and Piyush Garg.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
