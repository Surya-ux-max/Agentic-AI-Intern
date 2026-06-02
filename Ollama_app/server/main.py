import ollama
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from contextlib import asynccontextmanager
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    load_dataset()
    yield
    # Shutdown (if needed)

# FastAPI app with lifespan
app = FastAPI(title="Cat Facts Q&A API", version="1.0.0", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    answer: str
    retrieved_knowledge: List[Dict[str, Any]]

# Global variables
dataset = []
VECTOR_DB = []
EMBEDDING_MODEL = "hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF"
LANGUAGE_MODEL = "hf.co/bartowski/Llama-3.2-1B-Instruct-GGUF"

# Load dataset on startup
def load_dataset():
    global dataset, VECTOR_DB
    try:
        dataset_path = os.path.join(os.path.dirname(__file__), "cat-facts.txt")
        
        with open(dataset_path, "r", encoding="utf-8") as file:
            dataset = file.readlines()
        
        print(f"Loaded {len(dataset)} entries")
        
        # Create embeddings for all chunks
        for i, chunk in enumerate(dataset):
            add_chunk_to_database(chunk)
            print(f"Added chunk {i + 1}/{len(dataset)} to the database")
            
        print("Dataset initialization complete!")
    except FileNotFoundError:
        print("ERROR: cat-facts.txt not found!")
        raise
    except Exception as e:
        print(f"ERROR during dataset loading: {e}")
        raise

def add_chunk_to_database(chunk):
    embedding = ollama.embed(
        model=EMBEDDING_MODEL,
        input=chunk
    )["embeddings"][0]
    
    VECTOR_DB.append((chunk, embedding))

def cosine_similarity(a, b):
    dot_product = sum(x * y for x, y in zip(a, b))
    norm_a = sum(x ** 2 for x in a) ** 0.5
    norm_b = sum(y ** 2 for y in b) ** 0.5
    
    if norm_a == 0 or norm_b == 0:
        return 0
    
    return dot_product / (norm_a * norm_b)

def retrieve(query, top_n=3):
    query_embedding = ollama.embed(
        model=EMBEDDING_MODEL,
        input=query
    )["embeddings"][0]
    
    similarities = []
    for chunk, embedding in VECTOR_DB:
        similarity = cosine_similarity(query_embedding, embedding)
        similarities.append((chunk, similarity))
    
    similarities.sort(key=lambda x: x[1], reverse=True)
    return similarities[:top_n]



@app.get("/")
async def root():
    return {"message": "Cat Facts Q&A API is running!", "endpoints": ["/health", "/ask", "/docs"]}

@app.get("/health")
async def health_check():
    try:
        # Test Ollama connection
        test_response = ollama.embed(
            model=EMBEDDING_MODEL,
            input="test"
        )
        return {
            "status": "healthy", 
            "database_size": len(VECTOR_DB),
            "dataset_size": len(dataset),
            "ollama": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy", 
            "error": str(e),
            "database_size": len(VECTOR_DB),
            "dataset_size": len(dataset)
        }

@app.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    try:
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        # Retrieve relevant chunks
        retrieved_knowledge = retrieve(request.question)
        
        # Build context string
        context = "\n".join(
            f" - {chunk.strip()}"
            for chunk, similarity in retrieved_knowledge
        )
        
        # Create system prompt
        instruction_prompt = f"""
You are a helpful chatbot.

Use only the following pieces of context to answer the question.
Do not make up any information that is not present in the context.

Context:
{context}
"""
        
        # Chat with the language model
        response = ollama.chat(
            model=LANGUAGE_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": instruction_prompt
                },
                {
                    "role": "user",
                    "content": request.question
                }
            ],
            stream=False
        )
        
        # Format retrieved knowledge
        knowledge_list = [
            {"text": chunk.strip(), "similarity": similarity}
            for chunk, similarity in retrieved_knowledge
        ]
        
        return QueryResponse(
            answer=response["message"]["content"],
            retrieved_knowledge=knowledge_list
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)