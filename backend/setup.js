#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🤖 Setting up Persona AI Chatbot...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file...');
    const envContent = `# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration  
PORT=3000

# Development Environment
NODE_ENV=development`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('❗ IMPORTANT: Please add your OpenAI API key to the .env file\n');
} else {
    console.log('✅ .env file already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    console.log('⚠️  Backend dependencies not installed');
    console.log('🔧 Please run: npm install\n');
} else {
    console.log('✅ Backend dependencies installed\n');
}

// Check React app dependencies
const reactNodeModulesPath = path.join(__dirname, 'persona-chatbot-react', 'node_modules');
if (!fs.existsSync(reactNodeModulesPath)) {
    console.log('⚠️  React app dependencies not installed');
    console.log('🔧 Please run: cd persona-chatbot-react && npm install\n');
} else {
    console.log('✅ React app dependencies installed\n');
}

console.log('📋 Setup Checklist:');
console.log('1. ✅ Project structure ready');
console.log('2. ✅ Configuration files created');
console.log('3. 🔧 Add your OpenAI API key to .env file');
console.log('4. 🔧 Install dependencies if needed');
console.log('5. 🚀 Run: npm run dev:both\n');

console.log('🎉 Setup complete! Follow the checklist above to get started.');
console.log('📚 See README.md for detailed instructions.');
