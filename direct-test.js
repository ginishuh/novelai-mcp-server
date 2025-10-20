import axios from 'axios';
import { config } from 'dotenv';

config();

async function testDirectAPI() {
  console.log('🧪 Testing NovelAI API directly...');
  
  try {
    // Test text generation
    console.log('\n📝 Testing text generation...');
    const textResponse = await axios.post(
      'https://text.novelai.net/ai/generate',
      {
        model: 'kayra-v1',
        input: 'Hello, world!',
        parameters: {
          max_length: 50,
          min_length: 1,
          temperature: 0.75,
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
    
    console.log('✅ Text Generation Success:');
    console.log('Generated text:', textResponse.data.output || textResponse.data);
    
  } catch (error) {
    console.error('❌ Text Generation Error:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
  }
  
  try {
    // Test image generation
    console.log('\n🎨 Testing image generation...');
    const imageResponse = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        input: 'beautiful sunset over mountains, anime style',
        model: 'nai-diffusion-3',
        parameters: {
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
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
    
    console.log('✅ Image Generation Success:');
    console.log('Response type:', typeof imageResponse.data);
    console.log('Keys in response:', Object.keys(imageResponse.data));
    
  } catch (error) {
    console.error('❌ Image Generation Error:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
    console.error('Message:', error.message);
  }
}

testDirectAPI();
