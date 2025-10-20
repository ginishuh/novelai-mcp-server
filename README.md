# NovelAI MCP Server

[English README below]

## 한국어 README

Model Context Protocol (MCP) 서버로 NovelAI 이미지 생성을 사용하세요. 캐릭터 포지셔닝과 V4 프롬프트 같은 고급 기능으로 고품질 애니메 아트를 만들 수 있습니다.

## ⚠️ 중요 알림

**현재 API 제한**: NovelAI API는 현재 `nai-diffusion-3` 모델만 지원합니다. 고급 V4.5 기능은 웹 인터페이스에서는 사용 가능하지만 아직 API에서는 지원되지 않습니다. NovelAI가 API 지원을 확장하면 즉시 업데이트하겠습니다!

## 기능들

- 🎨 **AI 이미지 생성** NovelAI의 nai-diffusion-3 모델 사용
- 🎭 **고급 캐릭터 포지셔닝** V4 프롬프트 포맷으로
- 💾 **직접 파일 저장** 바로 데스크톱에
- 🔧 **간단한 설정** 환경변수나 .env 파일로
- 🌐 **크로스플랫폼** 지원 (Windows, Linux, macOS)
- 📦 **설정 필요 없음** npm으로 바로 설치
- ⚡ **고급 파라미터**: dynamic thresholding, variety boost, quality toggle

## 설치 방법 (한국어)

### 전역 설치 (권장)
```bash
npm install -g novelai-mcp-server
```

### 로컬 설치
```bash
npm install novelai-mcp-server
```

## 설정 방법 (한국어)

### 방법 1: 환경변수 (권장)

**Windows:**
```cmd
setx NOVELAI_API_KEY "당신의-API-키"
```

**Linux/macOS:**
```bash
export NOVELAI_API_KEY="당신의-API-키"
echo 'export NOVELAI_API_KEY="당신의-API-키"' >> ~/.bashrc
```

### 방법 2: .env 파일

서버를 실행하는 디렉터리에 `.env` 파일 생성:
```env
NOVELAI_API_KEY=당신의-API-키
```

## MCP 설정 (한국어)

MCP 클라이언트 설정 파일에 추가 (보통 `~/.config/claude/mcp.json`):

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

## 사용 예시 (한국어)

### 기본 이미지 생성
```
아름다운 애니메 소녀 이미지 생성해줘
```

### 파일 저장 포함
```
애니메 일몰 노을 이미지 생성하고 파일로 저장해줘
```

### 캐릭터 포지셔닝
```
왼쪽에는 금발 여자아이, 오른쪽에는 검은머리 남자아이가 있는 공원 이미지 생성해줘
```

---

# NovelAI MCP Server

Model Context Protocol (MCP) server for NovelAI image generation. Create high-quality anime art with advanced features like character positioning and V4 prompts.

## ⚠️ Important Note

**Current API Limitation**: NovelAI's API currently supports `nai-diffusion-3` model only. Advanced V4.5 features are available on the web interface but not yet in the API. We'll update as soon as NovelAI expands API support!

## Features

- 🎨 **AI Image Generation** using NovelAI's nai-diffusion-3 model
- 🎭 **Advanced Character Positioning** with V4 prompt format
- 💾 **Direct File Saving** to your Desktop
- 🔧 **Easy Setup** with environment variables or .env file
- 🌐 **Cross-platform** support (Windows, Linux, macOS)
- 📦 **Zero-config installation** via npm
- ⚡ **Advanced Parameters**: dynamic thresholding, variety boost, quality toggle

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

## Available Tools

### 🎨 `generate_image`
Generate high-quality anime images using NovelAI's nai-diffusion-3 model.

**Basic Parameters:**
- `prompt` (required): Text prompt for image generation
- `model`: Model to use (default: "nai-diffusion-3") ⚠️ **Only supported model currently**
- `sampler`: Sampler algorithm (default: "k_euler_ancestral")
- `seed`: Random seed (default: -1 for random)
- `negative_prompt`: Negative prompt to avoid unwanted elements
- `n_samples`: Number of images to generate (default: 1)
- `width`: Image width (default: 512)
- `height`: Image height (default: 768)
- `scale`: CFG scale - prompt adherence (default: 5.0)
- `steps`: Number of generation steps (default: 28)

**🎭 Advanced Features:**
- `v4_prompt`: V4 prompt format for character positioning
  - `base_caption`: Base scene description
  - `char_captions`: Array of characters with precise x,y coordinates (0-1 range)
- `save_to_file`: Save image to local file (default: false)
- `output_dir`: Custom save directory (default: Desktop/novelai_images)
- `filename`: Custom filename (without extension)
- `dynamic_thresholding`: Enable for better contrast
- `variety_boost`: Enable for more diverse results
- `quality_toggle`: Enable quality enhancement

**📱 Example Usage:**

**Basic:**
```
Generate an image of a beautiful anime girl in a garden, masterpiece, best quality
```

**Character Positioning:**
```json
{
  "prompt": "masterpiece, anime style, park scene",
  "v4_prompt": {
    "base_caption": "masterpiece, anime style, park scene",
    "char_captions": [
      {
        "centers": [{"x": 0.3, "y": 0.4}],
        "char_caption": "1girl, blonde hair, blue eyes, smiling, summer dress"
      }
    ]
  },
  "save_to_file": true
}
```

**With File Saving:**
```
Generate image of anime sunset, save to file, use dynamic thresholding
```

## Quick Start Examples

### Basic Image Generation
1. Ask your AI assistant: "Generate an image of a beautiful anime girl with blue hair"
2. The assistant will use the `generate_image` tool
3. Image data will be returned in base64 format

### Character Positioning
1. Ask: "Create an image with a girl on the left side and a boy on the right side"
2. The assistant will use V4 prompt with character positioning
3. Characters will be placed at precise coordinates

### File Saving
1. Ask: "Generate an anime landscape and save it to file"
2. Image will be automatically saved to Desktop/novelai_images/

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

**"Model doesn't exist" error**
- Only use "nai-diffusion-3" model currently
- NovelAI API doesn't support V4.5 yet

**Image generation fails**
- Check your NovelAI account balance
- Verify API key is valid and active
- Check internet connection

**File saving fails**
- Ensure Desktop directory exists
- Check write permissions
- Verify output directory path is valid

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

## Limitations

- **Model Support**: Only `nai-diffusion-3` currently available via API
- **Rate Limits**: Subject to NovelAI's API rate limiting
- **Account Requirements**: Valid NovelAI subscription required

## Future Updates

We're actively monitoring NovelAI's API updates and will add support for:
- V4.5 models when available in API
- Additional samplers and parameters
- Enhanced character positioning features
- Text generation capabilities

## 라이선스

MIT License - LICENSE 파일 참조

## 저자

**ginishuh** - [GitHub](https://github.com/ginishuh)

## 지원

- 📧 이슈: [GitHub Issues](https://github.com/ginishuh/novelai-mcp-server/issues)
- 🐛 버그 리포트: [이슈 생성](https://github.com/ginishuh/novelai-mcp-server/issues/new)

---

**Made with ❤️ by ginishuh** | Version 0.1.0

---

## License (English)

MIT License - see LICENSE file for details

## Author (English)

**ginishuh** - [GitHub](https://github.com/ginishuh)

## Support (English)

- 📧 Issues: [GitHub Issues](https://github.com/ginishuh/novelai-mcp-server/issues)
- 🐛 Bug Reports: [Create Issue](https://github.com/ginishuh/novelai-mcp-server/issues/new)

---

**Made with ❤️ by ginishuh** | Version 0.1.0
