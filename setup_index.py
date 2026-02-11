import requests

BASE = "http://localhost:8080/api/v1"

payload = {
    "index_name": "agent_memory",
    "dim": 384,
    "space_type": "cosine"
}

r = requests.post(
    f"{BASE}/index/create",
    json=payload,
    headers={"Content-Type": "application/json"}
)

print(r.status_code, r.text)
  