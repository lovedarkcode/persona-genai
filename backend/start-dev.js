#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Persona AI Chatbot Development Environment...\n');

function startServers() {
    // Start backend server
    console.log('📡 Starting backend server...');
    const backend = spawn('node', ['server.js'], {
        cwd: __dirname,
        stdio: 'inherit',
        shell: process.platform === 'win32'
    });

    // Wait a bit for backend to start, then start frontend
    setTimeout(() => {
        console.log('⚛️  Starting React frontend...');
        const frontend = spawn('npm', ['run', 'dev'], {
            cwd: path.join(__dirname, 'persona-chatbot-react'),
            stdio: 'inherit',
            shell: process.platform === 'win32'
        });

        // Handle process termination
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down development servers...');
            backend.kill('SIGINT');
            frontend.kill('SIGINT');
            process.exit(0);
        });

        backend.on('close', (code) => {
            console.log(`Backend server exited with code ${code}`);
            frontend.kill('SIGINT');
        });

        frontend.on('close', (code) => {
            console.log(`Frontend server exited with code ${code}`);
            backend.kill('SIGINT');
        });

        console.log('\n✅ Development servers starting...');
        console.log('📡 Backend API: http://localhost:3000');
        console.log('⚛️  React Frontend: http://localhost:5173');
        console.log('\n💡 Press Ctrl+C to stop both servers\n');
    }, 3000);
}

// Start the servers
startServers();