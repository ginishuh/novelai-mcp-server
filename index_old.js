import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const server = new Server(
  {
    name: 'novelai-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_image',
        description: 'Generate images using NovelAI',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Text prompt for image generation',
            },
            model: {
              type: 'string',
              description: 'Model to use (default: "NAI Diffusion V4.5")',
              default: 'NAI Diffusion V4.5',
            },
            width: {
              type: 'number',
              description: 'Image width (default: 512)',
              default: 512,
            },
            height: {
              type: 'number',
              description: 'Image height (default: 768)',
              default: 768,
            },
            scale: {
              type: 'number',
              description: 'CFG scale (default: 5.0)',
              default: 5.0,
            },
            steps: {
              type: 'number',
              description: 'Number of steps (default: 28)',
              default: 28,
            },
          },
          required: ['prompt'],
        },
      },
      {
        name: 'generate_text',
        description: 'Generate text using NovelAI',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Text prompt for story generation',
            },
            model: {
              type: 'string',
              description: 'Model to use',
              enum: ['opus', 'calliope-v2', 'kayra-v1'],
              default: 'opus',
            },
            max_length: {
              type: 'number',
              description: 'Maximum text length',
              default: 256,
            },
            temperature: {
              type: 'number',
              description: 'Generation temperature',
              default: 0.75,
            },
          },
          required: ['prompt'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === 'generate_image') {
      const response = await axios.post(
        'https://api.novelai.net/ai/generate-image',
        {
          input: args.prompt,
          model: args.model || 'NAI Diffusion V4.5',
          parameters: {
            width: args.width || 512,
            height: args.height || 768,
            scale: args.scale || 5.0,
            steps: args.steps || 28,
            seed: -1,
            n_samples: 1,
            uc: '',
            ucPreset: 0,
            qualityToggle: false,
            sm: false,
            sm_dyn: false,
            dynamic_thresholding: false,
            controlnet_strength: 1,
            legacy: false,
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              image_data: response.data,
              prompt: args.prompt,
            }, null, 2),
          },
        ],
      };
    }

    if (name === 'generate_text') {
      const response = await axios.post(
        'https://api.novelai.net/ai/generate',
        {
          model: args.model || 'opus',
          input: args.prompt,
          parameters: {
            max_length: args.max_length || 256,
            min_length: 1,
            temperature: args.temperature || 0.75,
            top_p: 0.9,
            repetition_penalty: 1.0,
            repetition_penalty_range: 0,
            repetition_penalty_slope: 0,
            typical_p: 1,
            use_cache: false,
            use_string: true,
            return_end_sequence: false,
            prefix: 'vanilla',
            order: [1, 2, 3],
          },
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              success: true,
              generated_text: response.data.output,
              prompt: args.prompt,
              model: args.model,
            }, null, 2),
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: false,
            error: error.message,
            details: error.response?.data || 'No additional details',
          }, null, 2),
        },
      ],
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('NovelAI MCP server running on stdio');
}

run().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
