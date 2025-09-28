import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const personas = [
    {
      id: 'hitesh',
      name: 'Hitesh Choudhary',
      avatar: '👨‍💻',
      title: 'Full-Stack Development Guru',
      description: 'Learn web development with chai and code! Expert in React, JavaScript, Node.js, and modern web technologies.',
      expertise: ['React.js', 'JavaScript', 'Node.js', 'Full-stack Development', 'Web Development', 'Teaching'],
      signature: 'Chai aur Code',
      color: 'from-orange-400 via-red-500 to-pink-500',
      bgColor: 'from-orange-500/20 to-red-500/20',
      website: 'https://hitesh.ai/',
      students: '2M+',
      rating: 4.9,
      specialties: ['Frontend Development', 'Backend APIs', 'Database Design', 'DevOps Basics']
    },
    {
      id: 'piyush',
      name: 'Piyush Garg',
      title: 'System Design Architect',
      avatar: '🚀',
      description: 'Master system design and backend engineering with industry best practices and scalable solutions.',
      expertise: ['System Design', 'Backend Development', 'Microservices', 'Database Architecture', 'Scalability', 'DevOps'],
      signature: 'Engineering Excellence',
      color: 'from-blue-400 via-indigo-500 to-purple-500',
      bgColor: 'from-blue-500/20 to-indigo-500/20',
      website: 'https://www.piyushgarg.dev/',
      students: '1.5M+',
      rating: 4.8,
      specialties: ['Distributed Systems', 'Cloud Architecture', 'Performance Optimization', 'Technical Leadership']
    }
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Learning',
      description: 'Advanced AI that understands your learning style and adapts to provide personalized guidance',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: '💡',
      title: 'Expert Knowledge',
      description: 'Get insights from industry experts with years of real-world development experience',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      icon: '🎯',
      title: 'Focused Learning',
      description: 'Specialized personas for different aspects of software development and system design',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      icon: '⚡',
      title: 'Instant Responses',
      description: 'Get immediate answers to your coding questions and technical challenges',
      gradient: 'from-yellow-400 to-orange-400'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Frontend Developer',
      content: 'Hitesh\'s AI persona helped me master React hooks in just a week! The explanations are so clear.',
      avatar: '👨‍💼',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Backend Engineer',
      content: 'Piyush\'s system design guidance transformed how I approach scalable architecture. Amazing!',
      avatar: '👩‍💻',
      rating: 5
    },
    {
      name: 'Arjun Kumar',
      role: 'Full-Stack Developer',
      content: 'Both personas complement each other perfectly. From frontend to system design - everything covered!',
      avatar: '👨‍🚀',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Active Learners', value: '50K+', icon: '👥' },
    { label: 'Questions Answered', value: '1M+', icon: '💬' },
    { label: 'Success Rate', value: '98%', icon: '🎯' },
    { label: 'Topics Covered', value: '200+', icon: '📚' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-white text-2xl">☕</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Chai aur GenAI
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Learning Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Support</span>
                </div>
                <div className="text-gray-400">3.5M+ Developers Trust Us</div>
              </div>
              <Link 
                to="/chat" 
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative z-10 text-center py-20 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
              <span>🚀 Now with Advanced AI Personas</span>
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Chai aur
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              GenAI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn software development with AI-powered mentors who understand your journey. 
            <span className="text-orange-400"> Get personalized guidance</span> from industry experts, 
            <span className="text-blue-400"> master complex concepts</span>, and 
            <span className="text-purple-400"> build production-ready skills</span>.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Real-time Mentoring', 'Code Reviews', 'System Design', 'Career Guidance', 'Project Ideas'].map((feature, index) => (
              <span key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer">
                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/chat"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="text-2xl">🚀</span>
              Start Your Journey
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </Link>
            <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300">
              <span className="text-xl">▶️</span>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why Choose Our AI Mentors?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of personalized learning with AI that understands your coding journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`text-5xl mb-6 p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} bg-opacity-20`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personas Section */}
      <section id="personas" className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Meet Your AI Mentors
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each mentor specializes in different aspects of software development, bringing years of expertise to guide your learning
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {personas.map((persona, index) => (
            <div key={persona.id} className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:from-white/15 hover:to-white/10 transition-all duration-500 transform hover:-translate-y-2">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${persona.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-20 h-20 bg-gradient-to-r ${persona.color} rounded-3xl flex items-center justify-center text-3xl shadow-2xl`}>
                      {persona.avatar}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
                      <p className="text-lg text-gray-300">{persona.title}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-white font-semibold">{persona.rating}</span>
                        </div>
                        <div className="text-gray-400">•</div>
                        <div className="text-gray-300">{persona.students} students</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mb-1"></div>
                    <span className="text-xs text-green-400 font-medium">Online</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">{persona.description}</p>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3 text-lg">Core Specialties:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {persona.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
                        <div className={`w-2 h-2 bg-gradient-to-r ${persona.color} rounded-full`}></div>
                        <span className="text-gray-200 text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {persona.expertise.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-200 rounded-full text-sm hover:bg-white/20 transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Link 
                    to={`/chat?persona=${persona.id}`} 
                    className={`flex-1 py-4 text-center bg-gradient-to-r ${persona.color} text-white rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg transform hover:scale-105`}
                  >
                    Start Learning with {persona.name.split(' ')[0]}
                  </Link>
                  <a 
                    href={persona.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300">What our learners say about their AI mentoring experience</p>
        </div>

        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 overflow-hidden">
          <div className="flex items-center justify-center space-x-4 mb-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-orange-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
            <blockquote className="text-2xl text-gray-200 mb-6 leading-relaxed max-w-4xl mx-auto">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            <div className="text-lg font-semibold text-white">{testimonials[currentTestimonial].name}</div>
            <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Ready to Transform Your Coding Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Join thousands of developers who are accelerating their careers with AI-powered mentorship. 
            Get personalized guidance, master complex concepts, and build production-ready skills.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/chat" 
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="text-2xl">🚀</span>
              <span>Start Learning Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </Link>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Trusted by</div>
              <div className="text-2xl font-bold text-white">3.5M+ Developers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/40 backdrop-blur-md border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl">☕</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Chai aur GenAI
                  </h3>
                  <p className="text-gray-400">AI-Powered Learning Platform</p>
                </div>
              </div>
              <p className="text-gray-300 max-w-md">
                Empowering developers worldwide with AI-driven mentorship and personalized learning experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#personas" className="hover:text-white transition-colors">AI Mentors</a></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Start Chat</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://hitesh.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Hitesh.ai</a></li>
                <li><a href="https://www.piyushgarg.dev/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PiyushGarg.dev</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Chai aur GenAI. Made with ❤️ for the developer community.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;