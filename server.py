from flask import Flask, request, jsonify
from flask_cors import CORS
from agent.agent import agent_response

app = Flask(__name__)
CORS(app)  # IMPORTANT: allows frontend to talk to backend

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")
    reply = agent_response(user_message)
    print("Sending to frontend:", reply)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
