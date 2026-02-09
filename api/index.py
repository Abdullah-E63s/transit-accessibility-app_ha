# Vercel Serverless Function Entrypoint
# This file adapts the FastAPI app to work with Vercel's serverless platform

import sys
import os

# Add backend directory to Python path so we can import modules
backend_path = os.path.join(os.path.dirname(__file__), '..', 'backend')
sys.path.insert(0, backend_path)

# Import the FastAPI app from backend
from main import app

# Vercel expects a handler named 'app' or a function
# FastAPI app can be used directly with Vercel
handler = app
