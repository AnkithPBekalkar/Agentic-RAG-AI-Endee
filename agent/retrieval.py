from agent.embeddings import embed
from agent.endee_client import search_vectors
from agent.memory import load_memories

def retrieve_memories(query, k=5):
    qvec = embed(query)
    results = search_vectors(qvec, k)

    all_mem = load_memories()
    mem_map = {m["id"]: m for m in all_mem}

    retrieved = []
    for r in results:
        mem_id = r[0]  #
        if mem_id in mem_map:
            retrieved.append(mem_map[mem_id])

    return retrieved
