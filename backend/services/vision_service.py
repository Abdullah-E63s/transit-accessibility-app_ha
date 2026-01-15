# backend/services/vision_service.py
import os


class VisionService:
    def __init__(self):
        # We will use Gemini Pro Vision here later
        self.api_key = os.getenv("GEMINI_API_KEY")

    def analyze_image(self, image_data):
        """
        Analyzes an image for accessibility hazards.

        TODO: Implement Gemini Vision API call.
        """
        # MOCK RESPONSE
        return {
            "description": "A bus stop with a snowy sidewalk.",
            "hazards": ["Snow obstructing ramp", "Uneven pavement"],
            "accessibility_score": 4.5  # Out of 10
        }