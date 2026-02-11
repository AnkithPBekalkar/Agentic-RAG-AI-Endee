
import json, uuid
from agent.embeddings import embed
from agent.endee_client import insert_vector

MEM_FILE = "data/memory.jsonl"

def store_memory(text, mem_type):
    vec = embed(text)
    mid = str(uuid.uuid4())

    record = {
        "id": mid,
        "text": text,
        "type": mem_type
    }

    with open(MEM_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(record) + "\n")

    insert_vector(mid, vec)


def load_memories(mem_type=None):
    memories = []
    try:
        with open(MEM_FILE, "r", encoding="utf-8") as f:
            for line in f:
                m = json.loads(line)
                if mem_type is None or m["type"] == mem_type:
                    memories.append(m)
    except FileNotFoundError:
        pass
    return memories
