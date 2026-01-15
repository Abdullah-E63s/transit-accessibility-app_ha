# backend/services/chat_service.py
import os


# import google.generativeai as genai  <-- Felix will uncomment this later

class ChatService:
    def __init__(self):
        # TODO (Felix): Initialize Gemini API here later
        # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # self.model = genai.GenerativeModel('gemini-pro')
        pass

    def correct_speech_input(self, messy_text: str) -> str:
        """
        Takes potentially unclear speech-to-text input (common with speech impediments)
        and uses Gemini to extract the clear intent/destination.
        """
        print(f"DEBUG: Correcting speech input: '{messy_text}'")

        # MOCK RETURN (Allows Shlok to test the flow)
        # In the real version, Gemini will fix "Un... un... onion" to "Union Station"
        return "Union Station"

    def get_chat_response(self, user_query: str, route_info: dict, climate_info: dict, vision_info: dict) -> str:
        """
        Synthesizes all the technical data into a helpful, human-friendly response.
        """
        print("DEBUG: Generating chat response with context...")

        # MOCK RETURN (Placeholder text)
        # TODO (Felix): Create the prompt that combines route_info + climate_info

        return (
            f"I found a great route for you! "
            f"If you take the {route_info.get('mode', 'transit')}, you'll arrive in about 25 minutes. "
            f"Plus, you're saving {climate_info.get('co2_saved_kg', 0)}kg of CO2! "
            "Note: The vision system detected some snow at the bus stop, so please be careful."
        )


# Simple test to run this file directly
if __name__ == "__main__":
    service = ChatService()

    # Test Scenario
    response = service.get_chat_response(
        user_query="How do I get to school?",
        route_info={"mode": "bus", "line": "504"},
        climate_info={"co2_saved_kg": 0.5},
        vision_info={"hazards": ["snow"]}
    )
    print(response)