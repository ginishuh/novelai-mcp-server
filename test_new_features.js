import axios from 'axios';
import { config } from 'dotenv';

config();

async function testNewFeatures() {
  console.log('🧪 Testing new NovelAI features...');
  
  try {
    // Test V4 Prompt with character positioning
    const v4PromptRequest = {
      action: 'generate',
      input: "masterpiece, best quality, anime style, outdoor scene",
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
          base_caption: "masterpiece, best quality, anime style, outdoor scene",
          char_captions: [
            {
              centers: [{ x: 0.3, y: 0.4 }],
              char_caption: "1girl, blonde hair, blue eyes, smiling, summer dress"
            },
            {
              centers: [{ x: 0.7, y: 0.5 }],
              char_caption: "1boy, black hair, green eyes, casual clothes"
            }
          ]
        }
      }
    };

    const response = await axios.post(
      'https://image.novelai.net/ai/generate-image',
      v4PromptRequest,
      {
        headers: {
          'Authorization': `Bearer ${process.env.NOVELAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer'
      }
    );

    console.log('✅ V4 Prompt with characters generated successfully!');
    console.log('📏 Image size:', response.data.length, 'bytes');
    
    // Save the test image
    const fs = await import('fs');
    const path = await import('path');
    const os = await import('os');
    
    const desktopPath = path.join(os.homedir(), 'Desktop');
    const outputDir = path.join(desktopPath, 'novelai_images');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filePath = path.join(outputDir, 'v4_character_test.png');
    fs.writeFileSync(filePath, response.data);
    
    console.log('💾 Saved to:', filePath);
    console.log('🎯 Check your Desktop/novelai_images folder!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
}

testNewFeatures();
