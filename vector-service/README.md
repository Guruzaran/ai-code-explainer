# Vector Service (FAISS + Sentence Transformers)

This service handles semantic search using FAISS and returns relevant documentation context to support code explanation.

## 🚀 Setup Instructions

```bash
python -m venv venv
source venv/bin/activate    # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
curl -X POST http://localhost:8001/search \
-H "Content-Type: application/json" \
-d '{"code": "for i in range(5): print(i)"}'
