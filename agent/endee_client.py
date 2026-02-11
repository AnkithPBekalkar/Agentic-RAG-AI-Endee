import requests, msgpack

BASE = "http://localhost:8080/api/v1"
HEADERS = {"Content-Type": "application/json"}

INDEX = "agent_memory"

def insert_vector(vec_id, vector):
    payload = {
        "id": vec_id,
        "vector": vector
    }
    requests.post(
        f"{BASE}/index/{INDEX}/vector/insert",
        json=payload,
        headers=HEADERS
    )

def search_vectors(vector, k=3):
    payload = {
        "vector": vector,
        "k": k
    }
    r = requests.post(
        f"{BASE}/index/{INDEX}/search",
        json=payload,
        headers=HEADERS
    )
    return msgpack.unpackb(r.content, raw=False)
