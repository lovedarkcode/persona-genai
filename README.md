# Persona AI Chatbot - React Frontend 🚀

A beautiful, modern React application built with Vite that showcases an AI-powered chatbot with unique personalities of Hitesh Choudhary and Piyush Garg.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## 🌟 Features

### 🎨 Beautiful UI/UX
- **Modern Design**: Glassmorphism effects with gradient backgrounds
- **Responsive Layout**: Seamless experience across all devices
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Dark Theme**: Professional dark mode with purple gradients

### 🤖 AI Personas
- **Hitesh Choudhary**: Enthusiastic educator with Hindi-English mix
- **Piyush Garg**: Technical system designer with analytical approach
- **Dynamic Switching**: Easy persona selection with visual indicators
- **Context Preservation**: Maintains conversation history per session

### 💬 Chat Features
- **Real-time Messaging**: Instant responses with typing indicators
- **Message Formatting**: Support for markdown-style formatting
- **Sample Questions**: Pre-built conversation starters
- **Clear Chat**: Easy conversation reset functionality

### 🔗 Navigation
- **Landing Page**: Attractive showcase with persona introductions
- **Chat Interface**: Dedicated chat experience
- **URL Parameters**: Direct persona selection via URL
- **React Router**: Smooth client-side navigation

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API server running on port 3000

### Installation

1. **Navigate to React app directory**
   ```bash
   cd persona-chatbot-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

### Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
persona-chatbot-react/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── LandingPage.jsx # Home page component
│   │   └── ChatInterface.jsx # Chat interface
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # React entry point
│   └── index.css          # Tailwind CSS imports
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── vite.config.js         # Vite configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Hitesh**: Orange to Yellow gradient (`from-orange-500 to-yellow-500`)
- **Piyush**: Blue to Indigo gradient (`from-blue-500 to-indigo-500`)
- **Background**: Dark slate with purple accents
- **Glass**: White with 10% opacity and backdrop blur

### Typography
- **Font Family**: Inter, system-ui, Avenir, Helvetica, Arial
- **Headings**: Bold weights with gradient text effects
- **Body**: Clean, readable with proper line heights

### Animations
- **Fade In**: Smooth opacity transitions
- **Slide Up**: Content enters from bottom
- **Pulse**: Loading and attention indicators
- **Hover Effects**: Scale transforms and color changes

## 🔌 API Integration

### Base Configuration
```javascript
const API_BASE_URL = 'http://localhost:3000';
```

### Endpoints Used
- `GET /api/personas` - Fetch available personas
- `POST /api/chat` - Send messages and get responses

### Request Format
```javascript
{
  message: "User's question",
  persona: "hitesh" | "piyush",
  conversationHistory: [
    { role: "user", content: "Previous message" },
    { role: "assistant", content: "Previous response" }
  ]
}
```

### Response Format
```javascript
{
  response: "AI-generated response",
  persona: "hitesh" | "piyush",
  timestamp: "2024-01-15T10:30:00.000Z"
}
```

## 🏗️ Components

### LandingPage.jsx
- **Purpose**: Welcome page with persona showcase
- **Features**: Hero section, features grid, persona cards, sample conversations
- **Navigation**: Links to chat interface with persona pre-selection

### ChatInterface.jsx
- **Purpose**: Main chat experience
- **Features**: Persona selection sidebar, message history, real-time chat
- **State Management**: React hooks for messages, typing, and persona state

## 🔧 Configuration

### Tailwind Config
Custom colors, animations, and responsive breakpoints configured in `tailwind.config.js`.

### Vite Config
Hot reload, build optimization, and asset handling configured for optimal development experience.

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Stacked layout, mobile-first approach
- **Tablet**: 768px - 1024px - Adjusted spacing and typography
- **Desktop**: > 1024px - Full sidebar layout with optimal spacing

### Mobile Optimizations
- Touch-friendly buttons and inputs
- Optimized font sizes and spacing
- Collapsible sidebar on mobile
- Smooth scroll behaviors

## 🎯 Features Deep Dive

### Persona Selection
- Visual persona cards with avatars and descriptions
- Expertise tags showing specialization areas
- One-click selection with visual feedback
- Persistent selection throughout session

### Message System
- Real-time message rendering with animations
- Support for formatted text (bold, italic, code)
- Timestamp display for all messages
- Scroll-to-bottom on new messages

### Typing Indicators
- Animated dots during AI response generation
- Input field state management
- Visual feedback for processing states

### Sample Questions
- Pre-written questions to inspire conversations
- One-click insertion into input field
- Persona-relevant suggestions
- Quick start for new users

## 🚀 Production Deployment

### Build Process
```bash
# Create production build
npm run build

# Files will be in ./dist directory
# Deploy dist/ contents to your hosting provider
```

### Environment Variables
- Backend API URL configuration
- CORS settings for production domains

### Performance Optimizations
- Code splitting with React.lazy()
- Image optimization and compression
- CSS purging for minimal bundle size
- Service worker for caching (optional)

## 🔍 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Ensure backend server is running on port 3000
   - Check CORS configuration in server
   - Verify network connectivity

2. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for conflicting CSS classes
   - Verify PostCSS processing

3. **Routing Problems**
   - Ensure React Router is properly configured
   - Check for correct route paths
   - Verify basename configuration for subdirectory deployments

### Development Tips
- Use React Developer Tools for debugging
- Check browser console for API errors
- Use network tab to monitor API calls
- Enable hot reload for faster development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use ESLint configuration
- Follow React best practices
- Maintain consistent formatting
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Links

- [Backend API Documentation](../README.md)
- [Hitesh Choudhary](https://hitesh.ai/)
- [Piyush Garg](https://www.piyushgarg.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- https://persona-genai-liart.vercel.app/[live-link]

## 💡 Future Enhancements

- [ ] Voice chat integration
- [ ] Message export functionality
- [ ] Theme customization options
- [ ] Offline support with service workers
- [ ] Mobile app version with React Native
- [ ] Real-time collaboration features
- [ ] Analytics dashboard

---

Built with ❤️ using React, Vite, and Tailwind CSS. Experience the future of AI conversation!
