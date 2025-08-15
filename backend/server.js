import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { PersonaAI } from './PersonaAI/Persona.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite dev server and React app
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize PersonaAI
let personaAI;
try {
    personaAI = new PersonaAI();
} catch (error) {
    console.error('⚠️  Error initializing PersonaAI:', error.message);
    if (error.message.includes('API key')) {
        console.error('❌ Please set your OPENAI_API_KEY environment variable');
        console.error('📝 In Vercel, add it through the dashboard or CLI');
    }
    // Don't exit in serverless environment, just log the error
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, persona, conversationHistory } = req.body;
        
        if (!message || !persona) {
            return res.status(400).json({ error: 'Message and persona are required' });
        }

        const response = await personaAI.generateResponse(message, persona, conversationHistory || []);
        
        res.json({ 
            response: response,
            persona: persona,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Persona AI Chatbot Backend is running!',
        timestamp: new Date().toISOString(),
        personas: personaAI.getAvailablePersonas().length
    });
});

app.get('/api/personas', (req, res) => {
    res.json(personaAI.getAvailablePersonas());
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Persona AI Chatbot server running on http://localhost:${PORT}`);
        console.log(`📝 Available personas: ${personaAI?.getAvailablePersonas().map(p => p.name).join(', ')}`);
    });
}

// Export for Vercel serverless functions
export default app;
