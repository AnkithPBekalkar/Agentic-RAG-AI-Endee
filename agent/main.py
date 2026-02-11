from agent.agent import agent_response

while True:
    user = input("You: ")
    if user.lower() in ("exit", "quit"):
        break
    print("Agent:", agent_response(user))
