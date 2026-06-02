# Cat Facts Q&A - Client-Server Application

A full-stack Q&A application about cats using Ollama for semantic search and language generation.

## Architecture

```text
Ollama_app/
├── server/           # FastAPI backend
│   ├── main.py       # FastAPI server with embeddings & chat
│   ├── cat-facts.txt # Dataset (cat facts)
│   ├── start_server.py # Development server script
│   └── requirements.txt
├── client/           # React frontend
│   ├── src/
│   │   ├── App.jsx   # Main Q&A interface
│   │   ├── App.css   # Styling
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Quick Start

### 1. Start the Backend Server

```bash
cd server
pip install -r requirements.txt
python start_server.py
```

Server runs at: `http://localhost:8000`

### 2. Start the Frontend Client

```bash
cd client
npm install
npm run dev
```

Client runs at: `http://localhost:5173`

## Features

- **Semantic Search**: Uses Ollama embeddings to find relevant cat facts
- **AI Chat**: Generates contextual answers using Llama model
- **Real-time Interface**: Interactive React frontend with instant responses
- **Source Tracking**: Shows similarity scores and source information
- **Responsive Design**: Works on desktop and mobile devices

## API Endpoints

- `GET /` - Health check
- `POST /ask` - Submit questions and get AI responses

Example request:
```json
{
  "question": "How long do cats sleep?"
}
```

## Technologies Used

**Backend:**
- FastAPI
- Ollama
- Uvicorn
- Pydantic

**Frontend:**
- React
- Vite
- CSS3

## Requirements

- Python 3.8+
- Node.js 16+
- Ollama installed and running
- Llama model: `hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF`

## Development

The server includes auto-reload for development. The client uses Vite's hot module replacement for instant updates.