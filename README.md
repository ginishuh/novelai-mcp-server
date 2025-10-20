# NovelAI MCP Server

Model Context Protocol (MCP) server for NovelAI integration.

## Installation

```bash
npm install -g novelai-mcp-server
```

## Usage

Set your NovelAI API key as environment variable:

```bash
export NOVELAI_API_KEY="your-api-key-here"
```

Add to your MCP configuration:

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

## Available Tools

### generate_image
Generate images using NovelAI

Parameters:
- `prompt` (required): Text prompt for image generation
- `model`: Model to use (default: "NAI Diffusion V3")
- `width`: Image width (default: 512)
- `height`: Image height (default: 768)
- `scale`: CFG scale (default: 5.0)
- `steps`: Number of steps (default: 28)

### generate_text
Generate text using NovelAI

Parameters:
- `prompt` (required): Text prompt for story generation
- `model`: Model to use (default: "calliope-v2")
- `max_length`: Maximum text length (default: 256)
- `temperature`: Generation temperature (default: 0.75)

## License

MIT

## Author

ginishuh - https://github.com/ginishuh
