from agent.memory import store_memory
from agent.retrieval import retrieve_memories
from agent.llm import call_gemini

BASE_SYSTEM_PROMPT = """
You are an assistant with long-term memory.
You must answer the user's question directly.
Do NOT ask follow-up questions.

"""

def is_question(text: str) -> bool:
    question_words = (
        "how", "what", "why", "when", "where",
        "who", "is", "are", "do", "does", "can",
        "could", "should", "would"
    )
    t = text.lower().strip()
    return t.endswith("?") or t.split()[0] in question_words


def agent_response(user_input: str):
    text = user_input.strip()

    # --- AUTO-STORE STATEMENTS ---
    if not is_question(text):
        mem_type = "preference" if "concise" in text.lower() else "fact"
        store_memory(text, mem_type)

        if mem_type == "preference":
            return "Understood. I’ll keep my answers concise."

        return "Got it."

    # --- RETRIEVE MEMORIES ---
    facts = retrieve_memories(text)
    preferences = retrieve_memories("concise")

    concise = any("concise" in m["text"].lower() for m in preferences)

    # --- SYSTEM PROMPT ---
    system_prompt = BASE_SYSTEM_PROMPT

    if concise:
        system_prompt += (
            "\nSTRICT RULE: Respond in ONE short sentence only. "
            "Maximum 15 words. No lists. No explanations."
        )

    memory_context = "\n".join(
        f"- {m['text']}" for m in facts
    ) if facts else "No relevant memory."

    prompt = f"""
{system_prompt}

MEMORY:
{memory_context}

QUESTION:
{text}

ANSWER:
"""

    response = call_gemini(prompt)

    # --- HARD POST-PROCESSING (IMPORTANT) ---
    if concise:
        response = response.split(".")[0].strip() + "."

    return response
