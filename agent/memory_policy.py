
def analyze_input(text: str):
    t = text.lower()

    # Preference detection
    if "i prefer" in t or "i like" in t or "i dislike" in t:
        return {
            "store": True,
            "type": "preference",
            "importance": 0.9
        }

    # Fact detection
    if "my name is" in t or "i am a" in t:
        return {
            "store": True,
            "type": "fact",
            "importance": 0.8
        }

    # Otherwise: episodic, low importance
    return {
        "store": False,
        "type": None,
        "importance": 0.0
    }
