import { spawn } from 'child_process';
import { config } from 'dotenv';

config();

// Test MCP server
const server = spawn('node', ['index.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'pipe']
});

// Send tools/list request
const request = {
  jsonrpc: "2.0",
  method: "tools/list",
  params: {},
  id: 1
};

server.stdin.write(JSON.stringify(request) + '\n');

let response = '';
server.stdout.on('data', (data) => {
  response += data.toString();
  try {
    const parsed = JSON.parse(response.trim());
    console.log('✅ Tools List Response:');
    console.log(JSON.stringify(parsed, null, 2));
    
    // Test text generation
    testTextGeneration();
  } catch (e) {
    // Still collecting data
  }
});

server.stderr.on('data', (data) => {
  console.error('Error:', data.toString());
});

function testTextGeneration() {
  console.log('\n🧪 Testing text generation...');
  
  const textRequest = {
    jsonrpc: "2.0", 
    method: "tools/call",
    params: {
      name: "generate_text",
      arguments: {
        prompt: "Hello, world!",
        max_length: 50,
        model: "opus"
      }
    },
    id: 2
  };
  
  server.stdin.write(JSON.stringify(textRequest) + '\n');
  
  server.stdout.once('data', (data) => {
    const response = data.toString();
    try {
      const parsed = JSON.parse(response.trim());
      console.log('✅ Text Generation Response:');
      console.log(JSON.stringify(parsed, null, 2));
      
      server.kill();
    } catch (e) {
      console.log('Response:', response);
    }
  });
}
