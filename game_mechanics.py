import random
from datetime import datetime

def process_message(text, user_data):
    # """Process a user message and update game state"""
    text = text.lower()
    results = {
        "leveled_up": False,
        "stat_increased": False,
        "gate_cleared": False,
        "shadow_gained": False,
        "message": ""
    }
    
    # Check for task completion
    if any(word in text for word in ["completed", "finished", "done", "cleared"]):
        # Award XP
        xp_gained = random.randint(10, 25)
        user_data["xp"] += xp_gained
        user_data["gates_cleared"] += 1
        results["gate_cleared"] = True
        results["message"] = f"Gate cleared! +{xp_gained} XP"
        
        # Check for level up
        if user_data["xp"] >= user_data["xp_to_next_level"]:
            level_up(user_data)
            results["leveled_up"] = True
            results["message"] += f"\nYou have leveled up to Level {user_data['level']}!"
    
    # Check for skill improvement
    if any(word in text for word in ["practiced", "improved", "trained", "learned"]):
        stat = determine_stat(text)
        user_data["stats"][stat] += 1
        results["stat_increased"] = True
        results["message"] += f"\n{stat.capitalize()} increased to {user_data['stats'][stat]}!"
    
    # Update last active time
    user_data["last_active"] = datetime.now().isoformat()
    
    return results

def level_up(user_data):
    """Handle level up logic"""
    user_data["level"] += 1
    user_data["xp"] -= user_data["xp_to_next_level"]
    # Increase XP required for next level
    user_data["xp_to_next_level"] = user_data["level"] * 100
    
    # Update rank if needed
    update_rank(user_data)
    
    return user_data

def update_rank(user_data):
    # """Update hunter rank based on level"""
    level = user_data["level"]
    if level >= 50:
        user_data["rank"] = "S"
    elif level >= 40:
        user_data["rank"] = "A"
    elif level >= 30:
        user_data["rank"] = "B"
    elif level >= 20:
        user_data["rank"] = "C"
    elif level >= 10:
        user_data["rank"] = "D"
    else:
        user_data["rank"] = "E"
    
    return user_data

def determine_stat(text):
    # """Determine which stat should be increased based on message"""
    if any(word in text for word in ["workout", "exercise", "lift", "run", "push"]):
        return "strength"
    elif any(word in text for word in ["study", "read", "learn", "understand", "research"]):
        return "intelligence"
    elif any(word in text for word in ["fast", "quick", "speed", "agility", "reflex"]):
        return "agility"
    elif any(word in text for word in ["endure", "long", "marathon", "persist", "stamina"]):
        return "endurance"
    else:
        # Default to a random stat if no keywords match
        return random.choice(["strength", "intelligence", "agility", "endurance"])

def check_for_special_event(user_data):
    # """Randomly determine if a special event should occur"""
    # 10% chance of special event
    if random.random() < 0.1:
        event_types = ["red gate", "double gate", "boss gate"]
        return random.choice(event_types)
    return None

if __name__ == "__main__"