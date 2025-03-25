import json
import os
from datetime import datetime

# Create a data directory if it doesn't exist
os.makedirs('data', exist_ok=True)

def save_user(session_id, data):
    """Save user data to a JSON file"""
    with open(f'data/{session_id}.json', 'w') as f:
        json.dump(data, f, indent=2)

def load_user(session_id):
    """Load user data from JSON file or create new profile"""
    try:
        with open(f'data/{session_id}.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        # Create new user with default stats
        return {
            "name": "Hunter",
            "rank": "E",
            "level": 1,
            "xp": 0,
            "xp_to_next_level": 100,
            "stats": {
                "strength": 10,
                "intelligence": 10,
                "agility": 10,
                "endurance": 10
            },
            "gates_cleared": 0,
            "shadows": [],
            "created_at": datetime.now().isoformat(),
            "last_active": datetime.now().isoformat()
        }