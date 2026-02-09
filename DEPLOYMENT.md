# Deployment Guide - Transit Accessibility App

## Overview

This guide covers deploying your Transit Accessibility App to production. The app consists of:
- **Frontend**: React app (deployed to Vercel)
- **Backend**: FastAPI Python app (deployed separately)

---

## Frontend Deployment (Vercel)

### Prerequisites
1. [Vercel account](https://vercel.com/signup)
2. Vercel CLI installed: `npm i -g vercel`
3. Backend deployed and accessible via HTTPS

### Step 1: Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel
```

### Step 2: Configure Environment Variables

In your Vercel dashboard or via CLI:

```bash
vercel env add REACT_APP_API_URL
# Enter your backend URL: https://your-backend-url.com
```

### Step 3: Update vercel.json

Edit `vercel.json` and update the `rewrites` section with your actual backend URL:

```json
"rewrites": [
  {
    "source": "/api/:path*",
    "destination": "https://your-actual-backend-url.com/api/:path*"
  }
]
```

### Production Deployment

```bash
vercel --prod
```

---

## Backend Deployment Options

### Option 1: Railway (Recommended for FastAPI)

1. **Sign up**: [railway.app](https://railway.app)
2. **Create new project** → Deploy from GitHub
3. **Add environment variables**:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `PORT`: 8000
4. **Deploy**: Railway will auto-detect Python and use `uvicorn`

**Buildpack Detection**: Railway automatically detects `requirements.txt`

**Start Command**: 
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Option 2: Render

1. **Sign up**: [render.com](https://render.com)
2. **New Web Service** → Connect your GitHub repo
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Add environment variables**:
   - `GEMINI_API_KEY`
   - `PYTHON_VERSION`: 3.11

### Option 3: Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app (from backend directory)
cd backend
fly launch

# Deploy
fly deploy
```

Create `backend/fly.toml`:
```toml
app = "transit-accessibility-backend"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8000"

[[services]]
  internal_port = 8000
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

---

## Post-Deployment Checklist

- [ ] Update backend CORS settings to allow your Vercel domain
- [ ] Add backend URL to `vercel.json` rewrites
- [ ] Set `REACT_APP_API_URL` environment variable in Vercel
- [ ] Test all API endpoints from frontend
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS on backend
- [ ] Set up monitoring and logging

---

## Update Backend CORS for Production

Edit `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",  # Your Vercel domain
        "http://localhost:3000"  # Keep for local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Environment Variables Summary

### Frontend (Vercel)
- `REACT_APP_API_URL`: Backend API base URL

### Backend (Railway/Render/Fly.io)
- `GEMINI_API_KEY`: Google Gemini API key
- `GEMINI_MODEL_ID`: gemini-2.5-flash (optional)
- `PORT`: 8000 (or use platform default)

---

## Troubleshooting

### Frontend can't connect to backend
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` is set correctly
- Check browser console for CORS errors

### Backend deployment fails
- Verify `requirements.txt` is in backend directory
- Check Python version compatibility (use 3.9+)
- Ensure `GEMINI_API_KEY` is set

### API calls return 404
- Verify API routes in backend are correct
- Check `vercel.json` rewrites configuration
- Test backend endpoints directly via Postman/curl

---

## Alternative: Deploy Everything to Vercel Serverless

If you want to deploy the backend to Vercel as serverless functions:

1. Convert FastAPI routes to Vercel serverless functions
2. Create `api/` directory in project root
3. Move backend logic to serverless function files
4. Update `vercel.json` to handle serverless routing

This requires significant restructuring and is not recommended for this app's current architecture.
