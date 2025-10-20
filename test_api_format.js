import axios from 'axios';
import { config } from 'dotenv';

config();

async function testAPIFormats() {
  console.log('🧪 Testing different NovelAI API formats...');
  
  const baseHeaders = {
    'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const prompt = "beautiful anime girl, masterpiece";
  
  // Test 1: Correct format from API docs
  console.log('\n📝 Test 1: Correct format from API docs');
  try {
    const response1 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        action: 'generate',
        input: prompt,
        model: 'nai-diffusion-3',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          negative_prompt: '',
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ Success:', Object.keys(response1.data));
  } catch (error) {
    console.log('❌ Failed:', error.response?.data);
  }

  // Test 2: Parameters wrapped in 'parameters' object
  console.log('\n📝 Test 2: Parameters wrapped');
  try {
    const response2 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        input: prompt,
        model: 'stable-diffusion',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          negative_prompt: '',
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ Success:', Object.keys(response2.data));
  } catch (error) {
    console.log('❌ Failed:', error.response?.data);
  }

  // Test 3: Different endpoint with parameters object
  console.log('\n📝 Test 3: Different endpoint with parameters');
  try {
    const response3 = await axios.post(
      'https://api.novelai.net/ai/generate-image',
      {
        input: prompt,
        model: 'nai-diffusion',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          negative_prompt: '',
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ Success:', Object.keys(response3.data));
  } catch (error) {
    console.log('❌ Failed:', error.response?.data);
  }

  // Test 4: Simplified format
  console.log('\n📝 Test 4: Simplified');
  try {
    const response4 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        prompt,
        model: 'stable-diffusion',
        sampler: 'k_euler_ancestral',
        seed: 12345,
      },
      { headers: baseHeaders }
    );
    console.log('✅ Success:', Object.keys(response4.data));
  } catch (error) {
    console.log('❌ Failed:', error.response?.data);
  }
}

testAPIFormats();
