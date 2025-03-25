from flask import Flask, request, jsonify
import logging
import os

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from flask import Flask, request, jsonify
import logging
import os
import json
from datetime import datetime

# Import your modules
from user_data import save_user, load_user
from game_mechanics import process_message, check_for_special_event

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def home():
    return "Omi-Leveling App is running!"

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    logger.info(f"Received data: {data}")
    session_id = data.get('session_id')
    segments = data.get('segments', [])
    
    if not session_id:
        return jsonify({"error": "No session ID"}), 400
    
    # Load user data
    user_data = load_user(session_id)
    game_results = None
    
    # Process messages
    for segment in segments:
        if segment.get('is_user') and segment.get('text'):
            text = segment.get('text')
            logger.info(f"Processing user message: {text}")
            game_results = process_message(text, user_data)
    
    # Check for special events
    special_event = check_for_special_event(user_data)
    if special_event:
        if game_results:
            game_results["special_event"] = special_event
        else:
            game_results = {"special_event": special_event}
    
    # Save updated user data
    save_user(session_id, user_data)
    
    # Create notification if needed
    if game_results:
        notification = create_notification(user_data, game_results)
        logger.info(f"Sending notification: {notification}")
        return jsonify(notification), 200
    
    return jsonify({}), 200

def create_notification(user_data, game_results):
    """Create a Solo Leveling style notification"""
    system_prompt = f"""You are the System from Solo Leveling. Speak to the hunter directly.
    
    Hunter Status:
    Name: {user_data.get('name', 'Hunter')}
    Rank: {user_data.get('rank', 'E')}
    Level: {user_data.get('level', 1)}
    XP: {user_data.get('xp', 0)}/{user_data.get('xp_to_next_level', 100)}
    Gates Cleared: {user_data.get('gates_cleared', 0)}
    
    Stats:
    Strength: {user_data.get('stats', {}).get('strength', 10)}
    Intelligence: {user_data.get('stats', {}).get('intelligence', 10)}
    Agility: {user_data.get('stats', {}).get('agility', 10)}
    Endurance: {user_data.get('stats', {}).get('endurance', 10)}
    
    Game Results:
    {game_results.get('message', '')}
    
    Special Event: {game_results.get('special_event', 'None')}
    
    Speak in the style of the System from Solo Leveling, using formal, game-like language.
    If the hunter leveled up, make it dramatic. If they gained a stat, acknowledge their growth.
    If a special event occurred, describe it in an exciting way. Keep the response under 300 characters.
    """
    
    # Create the notification object
    notification = {
        "notification": {
            "prompt": system_prompt,
            "params": ["user_name", "user_facts", "user_context"],
            "context": {
                "filters": {
                    "topics": ["Solo Leveling", "leveling", "hunter", "gates"]
                }
            }
        }
    }
    
    return notification

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)



