# backend/tests/conftest.py
import sys
from pathlib import Path

SERVICES_DIR = Path(__file__).resolve().parents[1] / "services"
sys.path.insert(0, str(SERVICES_DIR))