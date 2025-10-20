import axios from 'axios';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import os from 'os';

config();

async function testImageSave() {
  console.log('🧪 Testing image generation with file saving...');
  
  try {
    const prompt = "beautiful anime girl, masterpiece";
    
    const requestData = {
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

    console.log('✅ Image generated successfully!');
    
    // Test saving to file
    try {
      const desktopPath = path.join(os.homedir(), 'Desktop');
      const outputDir = path.join(desktopPath, 'novelai_images');
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const filename = `test_novelai_${Date.now()}.png`;
      const filePath = path.join(outputDir, filename);
      
      fs.writeFileSync(filePath, response.data);
      
      console.log(`✅ Image saved to: ${filePath}`);
      console.log(`📁 Check your Desktop/novelai_images folder!`);
      
    } catch (saveError) {
      console.error('❌ Error saving file:', saveError);
    }
    
  } catch (error) {
    console.error('❌ Error generating image:', error.response?.data);
  }
}

testImageSave();
