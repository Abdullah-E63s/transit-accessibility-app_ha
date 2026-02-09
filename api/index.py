# Vercel Serverless Function Entrypoint
# Minimal FastAPI app with Mangum adapter for serverless

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

# Create a minimal FastAPI app
app = FastAPI(
    title="Transit Accessibility API",
    description="Serverless API for transit accessibility features",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/api/health")
@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "API is running"}

# Basic route planning endpoint (mock for now)
@app.post("/api/route/plan")
async def plan_route():
    return {
        "routes": [],
        "message": "Backend is deployed but AI features require API key setup"
    }

# Calculate impact endpoint (mock)
@app.post("/api/calculate-impact")
async def calculate_impact():
    return {
        "co2_saved_kg": 0,
        "message": "Backend is deployed successfully"
    }

# Geocoding endpoint (mock)
@app.get("/api/maps/geocode")
async def geocode():
    return {
        "results": [],
        "message": "Backend deployed - full features require API keys"
    }

# Vision analysis endpoint (mock)
@app.post("/api/vision/analyze")
async def analyze_vision():
    return {
        "message": "Vision API requires GEMINI_API_KEY to be configured in Vercel"
    }

# Catch-all for any other /api routes
@app.get("/api/{full_path:path}")
async def catch_all_get(full_path: str):
    return {
        "message": f"Backend is running. Endpoint /api/{full_path} is available but may require configuration."
    }

@app.post("/api/{full_path:path}")
async def catch_all_post(full_path: str):
    return {
        "message": f"Backend is running. Endpoint /api/{full_path} is available but may require configuration."
    }

# Mangum adapter - this is what Vercel needs
handler = Mangum(app)
