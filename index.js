import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Load environment variables from .env file
config();

const server = new Server(
  {
    name: 'novelai-mcp-server',
    version: '1.1.0',
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
        description: 'Generate high-quality anime images using NovelAI',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Text prompt for image generation',
            },
            model: {
              type: 'string',
              description: 'Model to use (default: "nai-diffusion-3")',
              enum: ['nai-diffusion-3', 'nai-diffusion-4', 'safe-diffusion'],
              default: 'nai-diffusion-3',
            },
            sampler: {
              type: 'string',
              description: 'Sampler algorithm (default: "k_euler_ancestral")',
              enum: ['k_euler_ancestral', 'k_euler', 'k_dpmpp_2s_ancestral', 'k_dpmpp_2m', 'k_dpmpp_sde', 'ddim'],
              default: 'k_euler_ancestral',
            },
            seed: {
              type: 'number',
              description: 'Random seed (default: -1 for random)',
              default: -1,
            },
            negative_prompt: {
              type: 'string',
              description: 'Negative prompt to avoid unwanted elements (default: "")',
              default: '',
            },
            n_samples: {
              type: 'number',
              description: 'Number of images to generate (default: 1)',
              default: 1,
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
              description: 'CFG scale - prompt adherence (default: 5.0)',
              default: 5.0,
            },
            steps: {
              type: 'number',
              description: 'Number of generation steps (default: 28)',
              default: 28,
            },
            save_to_file: {
              type: 'boolean',
              description: 'Save image to local file (default: false)',
              default: false,
            },
            output_dir: {
              type: 'string',
              description: 'Output directory for saved images (default: Desktop/novelai_images)',
              default: '',
            },
            filename: {
              type: 'string',
              description: 'Custom filename (without extension, default: auto-generated)',
              default: '',
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
      // Build request based on NovelAI's API documentation
      const requestData = {
        action: 'generate',
        input: args.prompt,
        model: args.model || 'nai-diffusion-3',
        parameters: {
          sampler: args.sampler || 'k_euler_ancestral',
          seed: args.seed || -1,
          negative_prompt: args.negative_prompt || '',
          n_samples: args.n_samples || 1,
          width: args.width || 512,
          height: args.height || 768,
          scale: args.scale || 5.0,
          steps: args.steps || 28,
        }
      };

      const response = await axios.post(
        'https://image.novelai.net/ai/generate-image',
        requestData,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer'
        }
      );

      // Convert binary image data to base64
      const imageBase64 = Buffer.from(response.data).toString('base64');
      
      let savedFilePath = null;
      
      // Save to file if requested
      if (args.save_to_file) {
        try {
          // Determine output directory
          const desktopPath = path.join(os.homedir(), 'Desktop');
          const defaultDir = path.join(desktopPath, 'novelai_images');
          const outputDir = args.output_dir || defaultDir;
          
          // Create directory if it doesn't exist
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          // Generate filename
          let filename;
          if (args.filename) {
            filename = args.filename.replace(/[^a-zA-Z0-9_-]/g, '_');
          } else {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const randomStr = Math.random().toString(36).substring(2, 8);
            filename = `novelai_${timestamp}_${randomStr}`;
          }
          
          const filePath = path.join(outputDir, `${filename}.png`);
          
          // Save the file
          fs.writeFileSync(filePath, response.data);
          savedFilePath = filePath;
          
        } catch (saveError) {
          console.error('Error saving file:', saveError);
          savedFilePath = null;
        }
      }
      
      const result = {
        success: true,
        image_data: `data:image/png;base64,${imageBase64}`,
        prompt: args.prompt,
        model: args.model || 'nai-diffusion-3',
        parameters: requestData.parameters,
      };
      
      if (savedFilePath) {
        result.saved_file_path = savedFilePath;
        result.message = `Image saved to: ${savedFilePath}`;
      }
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
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
