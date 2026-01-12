
# backend/main.py
# FastAPI Application Entry Point for Transit Accessibility App

# Purpose: Provides REST API endpoints for:
#   - Route planning with accessibility considerations
#   - Eco-friendly transit impact tracking
#   - Accessibility alerts and information
#   - User engagement through gamification (points/badges)


from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List
from services.climate_service import ClimateEngine



# FastAPI Application Initialization


app = FastAPI(
    title="Inclusive Transit API",
    description="Accessibility-first transit API supporting wheelchair users, visually impaired, and hearing impaired individuals",
    version="1.0.0"
)

# Configure CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Climate Engine for emissions tracking
climate_engine = ClimateEngine()



# Pydantic Models (Data Validation & Documentation)


class TripRequest(BaseModel):
    """Model for transit trip information"""
    distance_km: float = Field(..., gt=0, description="Distance traveled in kilometers")
    mode: str = Field(..., description="Transit mode: 'bus', 'walk', 'bike', 'subway', 'car'")

class ImpactResponse(BaseModel):
    """Response model for climate impact calculation"""
    mode: str
    distance_km: float
    baseline_car_kg: float = Field(..., description="CO2 emissions if traveled by car")
    actual_kg: float = Field(..., description="Actual CO2 emissions for selected mode")
    co2_saved_kg: float = Field(..., description="CO2 saved compared to driving")
    points_earned: int = Field(..., description="Gamification points earned")


class AccessibilityFeature(BaseModel):
    """Model for accessibility information at a transit location"""
    feature_id: str
    feature_name: str
    is_available: bool
    description: Optional[str] = None

class StationAccessibilityInfo(BaseModel):
    """Model for complete accessibility info at a transit station/stop"""
    station_id: str
    station_name: str
    features: List[AccessibilityFeature]
    wheelchair_accessible: bool
    audio_announcements: bool
    visual_displays: bool
    elevators_working: bool
    accessible_restrooms: bool

class RouteOption(BaseModel):
    """Model for a single transit route option"""
    route_id: str
    origin: str
    destination: str
    mode: str
    estimated_time_minutes: int
    stops_count: int
    accessibility_score: float = Field(..., ge=0, le=100, description="0-100 accessibility rating")
    has_elevator: bool
    wheelchair_accessible: bool
    audio_assistance_available: bool


# API Routes - Health & Status

@app.get("/", tags=["Health"])
def home():
    """
    Root endpoint - confirms API is running
    Returns: Basic service status message
    """
    return {
        "message": "Inclusive Transit API is running! 🚀",
        "status": "healthy",
        "service": "Transit Accessibility App Backend"
    }


@app.get("/health", tags=["Health"])
def health_check():
    """
    Health check endpoint for load balancers and monitoring
    Returns: Service health status
    """
    return {"status": "healthy", "service": "transit-api"}


# API Routes - Climate Impact & Gamification

@app.post("/api/calculate-impact", response_model=ImpactResponse, tags=["Impact Tracking"])
async def calculate_impact(trip: TripRequest):
    """
    Calculate environmental impact of a transit trip
    
    **Functionality:**
    - Compares emissions against baseline (driving a car)
    - Calculates CO2 saved by using sustainable transit
    - Awards gamification points
    
    **Parameters:**
    - distance_km: Trip distance in kilometers (must be positive)
    - mode: Transit mode (bus, walk, bike, subway, car)
    
    **Returns:**
    - CO2 metrics (baseline, actual, saved)
    - Gamification points earned
    
    **Example:**
    ```json
    {
        "distance_km": 5.0,
        "mode": "bus"
    }
    ```
    """
    # Validate input
    if trip.distance_km < 0:
        raise HTTPException(
            status_code=400,
            detail="Distance cannot be negative"
        )
    
    # Validate mode
    valid_modes = ["bus", "walk", "bike", "subway", "car"]
    if trip.mode.lower() not in valid_modes:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid mode. Must be one of: {', '.join(valid_modes)}"
        )
    
    # Calculate impact using climate engine
    result = climate_engine.calculate_savings(trip.distance_km, trip.mode)
    return result

# API Routes - Accessibility Information

@app.get(
    "/api/station/{station_id}/accessibility",
    response_model=StationAccessibilityInfo,
    tags=["Accessibility"]
)
async def get_station_accessibility(station_id: str):
    """
    Retrieve accessibility information for a transit station
    
    **Functionality:**
    - Provides comprehensive accessibility features
    - Supports wheelchair users, visually impaired, hearing impaired
    - Real-time status of accessibility infrastructure
    
    **Parameters:**
    - station_id: Unique identifier for the transit station
    
    **Returns:**
    - Station name and location
    - List of available accessibility features
    - Status of elevators, restrooms, audio/visual systems
    
    **Note:** Currently returns mock data. To be integrated with database.
    """
    # TODO: Replace with actual database query
    mock_data = {
        "station_id": station_id,
        "station_name": f"Station {station_id}",
        "features": [
            AccessibilityFeature(
                feature_id="elevator_1",
                feature_name="Main Entrance Elevator",
                is_available=True,
                description="Accessible elevator with audio and Braille buttons"
            ),
            AccessibilityFeature(
                feature_id="ramp_1",
                feature_name="Wheelchair Ramp",
                is_available=True,
                description="Gentle slope ramp meeting ADA standards"
            )
        ],
        "wheelchair_accessible": True,
        "audio_announcements": True,
        "visual_displays": True,
        "elevators_working": True,
        "accessible_restrooms": True
    }
    return mock_data


@app.get(
    "/api/alerts",
    tags=["Accessibility"]
)
async def get_accessibility_alerts(
    station_id: Optional[str] = Query(None, description="Filter alerts by station ID")
):
    """
    Retrieve real-time accessibility alerts
    
    **Functionality:**
    - Provides alerts about broken elevators, accessibility issues
    - Helps users plan routes around inaccessible areas
    - Updates in real-time
    
    **Parameters:**
    - station_id (optional): Filter to specific station
    
    **Returns:**
    - List of active accessibility alerts with severity level
    
    **Note:** Currently returns mock data. To be integrated with real-time system.
    """
    # TODO: Integrate with real-time alert system
    mock_alerts = [
        {
            "alert_id": "alert_001",
            "station_id": "stn_downtown",
            "station_name": "Downtown Station",
            "severity": "high",
            "message": "Main elevator out of service for maintenance",
            "affected_accessibility": ["wheelchair", "mobility_impaired"],
            "estimated_resolution_time": "2 hours"
        }
    ]
    
    # Filter by station if provided
    if station_id:
        mock_alerts = [a for a in mock_alerts if a["station_id"] == station_id]
    
    return {"alerts": mock_alerts, "total_alerts": len(mock_alerts)}



# API Routes - Route Planning

@app.post(
    "/api/route/plan",
    response_model=List[RouteOption],
    tags=["Route Planning"]
)
async def plan_accessible_route(
    origin: str = Query(..., description="Starting location"),
    destination: str = Query(..., description="Destination location"),
    accessibility_priority: Optional[str] = Query(
        "balanced",
        description="'accessibility' or 'time' - determines route optimization"
    )
):
    """
    Plan a transit route with accessibility considerations
    
    **Functionality:**
    - Generates multiple route options for origin to destination
    - Prioritizes accessibility features (elevators, wheelchair access, audio guides)
    - Considers user's accessibility needs
    - Provides real-time transit information
    
    **Parameters:**
    - origin: Starting location/address
    - destination: End location/address
    - accessibility_priority: 'accessibility' (default) or 'time'
    
    **Returns:**
    - List of route options with:
      - Estimated travel time
      - Accessibility scores (0-100)
      - Available accessibility features
      - Number of stops
    
    **Note:** Currently returns mock data. To be integrated with transit APIs.
    """
    # TODO: Integrate with transit routing engine (GTFS, Google Transit API, etc.)
    mock_routes = [
        RouteOption(
            route_id="route_001",
            origin=origin,
            destination=destination,
            mode="bus",
            estimated_time_minutes=25,
            stops_count=5,
            accessibility_score=95.0,
            has_elevator=True,
            wheelchair_accessible=True,
            audio_assistance_available=True
        ),
        RouteOption(
            route_id="route_002",
            origin=origin,
            destination=destination,
            mode="subway",
            estimated_time_minutes=15,
            stops_count=3,
            accessibility_score=85.0,
            has_elevator=True,
            wheelchair_accessible=True,
            audio_assistance_available=False
        )
    ]
    
    return mock_routes



# API Routes - User Engagement & Gamification


@app.get(
    "/api/user/{user_id}/stats",
    tags=["Gamification"]
)
async def get_user_stats(user_id: str):
    """
    Retrieve user's eco-friendly transit engagement statistics
    
    **Functionality:**
    - Tracks CO2 saved through sustainable transit choices
    - Displays gamification points and badges earned
    - Shows contribution to environmental goals
    
    **Parameters:**
    - user_id: Unique user identifier
    
    **Returns:**
    - Total CO2 saved (kg)
    - Total trips taken
    - Points earned
    - Badges/achievements unlocked
    - Sustainability streak
    
    **Note:** Currently returns mock data. To be integrated with user database.
    """
    # TODO: Query user profile and trip history from database
    mock_stats = {
        "user_id": user_id,
        "total_co2_saved_kg": 127.5,
        "total_trips": 42,
        "total_points": 12750,
        "badges": [
            {"badge_id": "eco_warrior", "name": "Eco Warrior", "description": "Completed 10 sustainable trips"},
            {"badge_id": "carbon_hero", "name": "Carbon Hero", "description": "Saved 100kg of CO2"}
        ],
        "sustainability_streak_days": 14,
        "ranking": "Gold Tier"
    }
    return mock_stats



# Error Handling


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """
    Global error handler for HTTP exceptions
    Returns: Standardized error response
    """
    return {
        "error": exc.detail,
        "status_code": exc.status_code
    }


# Main Entry Point

if __name__ == "__main__":
    import uvicorn
    
    # Run the application with: uvicorn main:app --reload
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True
    )