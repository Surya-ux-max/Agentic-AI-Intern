import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from main import app
    import uvicorn
    
    print("Starting Cat Facts Q&A API Server...")
    print("Server will be available at: http://localhost:8000")
    print("API docs available at: http://localhost:8000/docs")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    
except ImportError as e:
    print(f"Import error: {e}")
    print("Please install required packages:")
    print("pip install fastapi uvicorn ollama pydantic")
    sys.exit(1)
except Exception as e:
    print(f"Error starting server: {e}")
    sys.exit(1)