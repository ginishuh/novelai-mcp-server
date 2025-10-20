import axios from 'axios';
import { config } from 'dotenv';

config();

async function testAdvancedFeatures() {
  console.log('🧪 Testing advanced NovelAI API features...');
  
  const baseHeaders = {
    'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const prompt = "masterpiece, best quality, anime style";

  // Test 1: Character Reference with Director
  console.log('\n📝 Test 1: Character Reference (Director)');
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
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
          // Character Reference
          director_reference_descriptions: [
            {
              caption: {
                base_caption: "character",
                char_captions: [
                  {
                    centers: [{ x: 0.5, y: 0.5 }],
                    char_caption: "1girl, short hair, brown eyes, smiling"
                  }
                ]
              }
            }
          ]
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ Character Reference Success - Size:', response1.data.length);
  } catch (error) {
    console.log('❌ Character Reference Failed:', error.response?.data?.message || error.message);
  }

  // Test 2: V4 Prompt Format
  console.log('\n📝 Test 2: V4 Prompt Format');
  try {
    const response2 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        action: 'generate',
        input: prompt,
        model: 'nai-diffusion-3',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
          v4_prompt: {
            caption: {
              base_caption: prompt,
              char_captions: [
                {
                  centers: [{ x: 0.3, y: 0.3 }],
                  char_caption: "1girl, blonde hair, blue eyes"
                },
                {
                  centers: [{ x: 0.7, y: 0.7 }],
                  char_caption: "1boy, black hair, green eyes"
                }
              ]
            }
          }
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ V4 Prompt Success - Size:', response2.data.length);
  } catch (error) {
    console.log('❌ V4 Prompt Failed:', error.response?.data?.message || error.message);
  }

  // Test 3: ControlNet
  console.log('\n📝 Test 3: ControlNet');
  try {
    const response3 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        action: 'generate',
        input: prompt,
        model: 'nai-diffusion-3',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
          controlnet_condition: "depth",  // or "canny", "openpose", etc.
          controlnet_model: "controlnet_depth",  
          controlnet_strength: 1.0
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ ControlNet Success - Size:', response3.data.length);
  } catch (error) {
    console.log('❌ ControlNet Failed:', error.response?.data?.message || error.message);
  }

  // Test 4: Dynamic Thresholding
  console.log('\n📝 Test 4: Dynamic Thresholding');
  try {
    const response4 = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      {
        action: 'generate',
        input: prompt,
        model: 'nai-diffusion-3',
        parameters: {
          sampler: 'k_euler_ancestral',
          seed: 12345,
          n_samples: 1,
          width: 512,
          height: 768,
          scale: 5.0,
          steps: 28,
          dynamic_thresholding: true
        }
      },
      { headers: baseHeaders }
    );
    console.log('✅ Dynamic Thresholding Success - Size:', response4.data.length);
  } catch (error) {
    console.log('❌ Dynamic Thresholding Failed:', error.response?.data?.message || error.message);
  }

  // Test 5: Augment Image (Upscale/Enhance)
  console.log('\n📝 Test 5: Augment Image');
  try {
    const response5 = await axios.post(
      'https://image.novelai.net/ai/augment-image',
      {
        image: "base64-encoded-image-data",  // Need actual image data
        prompt: prompt,
        req_type: "upscale",
        width: 1024,
        height: 1024
      },
      { headers: baseHeaders }
    );
    console.log('✅ Augment Image Success - Size:', response5.data.length);
  } catch (error) {
    console.log('❌ Augment Image Failed:', error.response?.data?.message || error.message);
  }
}

testAdvancedFeatures();
