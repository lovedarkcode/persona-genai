#!/usr/bin/env node

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

console.log('🧪 Testing Backend API...\n');

async function testBackend() {
    try {
        console.log('1. Testing server health...');
        const healthResponse = await axios.get(`${API_BASE_URL}/`);
        console.log('✅ Server is responding\n');

        console.log('2. Testing personas endpoint...');
        const personasResponse = await axios.get(`${API_BASE_URL}/api/personas`);
        console.log('✅ Personas endpoint working');
        console.log('📝 Available personas:', personasResponse.data.map(p => p.name).join(', '));
        console.log('');

        console.log('3. Testing chat endpoint...');
        const chatResponse = await axios.post(`${API_BASE_URL}/api/chat`, {
            message: "Hello, test message",
            persona: "hitesh",
            conversationHistory: []
        });
        console.log('✅ Chat endpoint working');
        console.log('🤖 Sample response:', chatResponse.data.response.substring(0, 100) + '...');
        console.log('');

        console.log('🎉 All tests passed! Backend is working correctly.');

    } catch (error) {
        console.error('❌ Backend test failed:');
        
        if (error.code === 'ECONNREFUSED') {
            console.error('   → Server is not running. Start it with: npm run dev');
        } else if (error.response?.status === 500) {
            console.error('   → Server error (likely OpenAI API key issue)');
            console.error('   → Check your .env file and ensure OPENAI_API_KEY is set');
        } else {
            console.error('   → Error:', error.message);
            if (error.response?.data) {
                console.error('   → Response:', error.response.data);
            }
        }
        
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Ensure backend server is running: npm run dev');
        console.log('2. Check OpenAI API key in .env file');
        console.log('3. Verify all dependencies are installed: npm install');
    }
}

testBackend();
