# NovelAI MCP Server

Model Context Protocol (MCP) server for NovelAI integration. Generate AI images and text using NovelAI's powerful models directly through MCP-compatible AI assistants.

## Features

- 🎨 **AI Image Generation** using NovelAI Diffusion models
- 📝 **AI Text Generation** using NovelAI's advanced language models  
- 🔧 **Easy Setup** with environment variables or .env file
- 🌐 **Cross-platform** support (Windows, Linux, macOS)
- 📦 **Zero-config installation** via npm

## Installation

### Global Installation (Recommended)
```bash
npm install -g novelai-mcp-server
```

### Local Installation
```bash
npm install novelai-mcp-server
```

## Configuration

### Method 1: Environment Variables (Recommended)

**Windows:**
```cmd
setx NOVELAI_API_KEY "your-api-key-here"
```

**Linux/macOS:**
```bash
export NOVELAI_API_KEY="your-api-key-here"
echo 'export NOVELAI_API_KEY="your-api-key-here"' >> ~/.bashrc
```

### Method 2: .env File

Create a `.env` file in the same directory where you run the server:
```env
NOVELAI_API_KEY=your-api-key-here
```

### Method 3: WSL2 Configuration

```bash
echo 'export NOVELAI_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

## MCP Configuration

Add to your MCP client configuration file (usually `~/.config/claude/mcp.json` or similar):

```json
{
  "mcpServers": {
    "novelai": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "novelai-mcp-server"]
    }
  }
}
```

### Alternative: Use Local Installation
```json
{
  "mcpServers": {
    "novelai": {
      "type": "stdio",
      "command": "node",
      "args": ["./node_modules/novelai-mcp-server/index.js"]
    }
  }
}
```

## Available Tools

### 🎨 `generate_image`
Generate high-quality AI images using NovelAI's diffusion models.

**Parameters:**
- `prompt` (required): Text description of the image to generate
- `model`: Model to use (default: "NAI Diffusion V4.5")
  - Available: "NAI Diffusion V4.5", "NAI Diffusion V3", "Safe Diffusion V4"
- `width`: Image width in pixels (default: 512, max: 1024)
- `height`: Image height in pixels (default: 768, max: 1024) 
- `scale`: CFG scale - prompt adherence (default: 5.0, range: 1.0-10.0)
- `steps`: Number of generation steps (default: 28, range: 1-50)
- `seed`: Random seed (default: -1 for random)

**Example Usage:**
```
Generate an image of a beautiful sunset over mountains, anime style, high quality
```

### 📝 `generate_text`
Generate creative text, stories, and content using NovelAI's language models.

**Parameters:**
- `prompt` (required): Text prompt or starting text
- `model`: Model to use (default: "opus")
  - Available: "opus", "calliope-v2", "kayra-v1"
- `max_length`: Maximum tokens to generate (default: 256, max: 2048)
- `temperature`: Creativity/randomness (default: 0.75, range: 0.1-1.5)
- `top_p`: Nucleus sampling (default: 0.9, range: 0.1-1.0)
- `repetition_penalty`: Reduce text repetition (default: 1.0)

**Example Usage:**
```
Once upon a time, in a world where magic and technology coexisted...
```

## Quick Start Examples

### Image Generation
1. Ask your AI assistant: "Generate an image of a fantasy dragon flying over a castle"
2. The assistant will use the `generate_image` tool
3. Image data will be returned in JSON format

### Text Generation  
1. Ask: "Continue this story: The ancient tome began to glow with an eerie blue light..."
2. The assistant will use `generate_text` tool
3. Generated text will be returned

## API Key Setup

1. Visit [NovelAI](https://novelai.net/)
2. Sign up or log in to your account
3. Go to Account Settings → API Keys
4. Generate a new API key
5. Copy the key and set it using one of the configuration methods above

## Troubleshooting

### Common Issues

**"API key not found"**
- Ensure NOVELAI_API_KEY is set correctly
- Check .env file is in the right directory
- Verify environment variable is properly exported

**"Module not found" errors**
- Run `npm install -g novelai-mcp-server` again
- Clear npm cache: `npm cache clean --force`

**MCP server not starting**
- Check Node.js version (requires 16+)
- Verify API key is valid and active
- Check internet connection

### Debug Mode

Set DEBUG environment variable for detailed logs:
```bash
DEBUG=novelai-mcp-server:* npx -y novelai-mcp-server
```

## Development

### Local Development Setup
```bash
git clone https://github.com/ginishuh/novelai-mcp-server.git
cd novelai-mcp-server
npm install
npm start
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

**ginishuh** - [GitHub](https://github.com/ginishuh)

## Support

- 📧 Issues: [GitHub Issues](https://github.com/ginishuh/novelai-mcp-server/issues)
- 📖 Documentation: [Repository Wiki](https://github.com/ginishuh/novelai-mcp-server/wiki)
- 🐛 Bug Reports: [Create Issue](https://github.com/ginishuh/novelai-mcp-server/issues/new)

---

**Made with ❤️ by ginishuh** | Version 1.0.1
