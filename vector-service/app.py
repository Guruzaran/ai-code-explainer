from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

app = Flask(__name__)

# 1. Load Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')  # free and fast

# 2. Sample documentation corpus
docs = [
    "The Python for loop is used to iterate over a sequence.",
    "The range() function generates a sequence of numbers starting from 0 by default.",
    "The print() function outputs text to the console.",
    "In JavaScript, for loops iterate using init, condition, and update expressions.",
    "The map() function in Python applies a function to every item in an iterable.",
    "JavaScript's console.log() outputs messages to the web console.",
    "The read_csv() function in pandas loads a CSV file into a DataFrame.",
    "List comprehensions in Python provide a concise way to create lists."
]

# 3. Embed the documents
doc_embeddings = model.encode(docs)
doc_embeddings = np.array(doc_embeddings)

# 4. Build FAISS index
dimension = doc_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(doc_embeddings)

@app.route('/search', methods=['POST'])
def search():
    code = request.json.get('code')
    if not code:
        return jsonify({'error': 'Missing code snippet'}), 400

    # 5. Embed the user input
    query_vec = model.encode([code])
    query_vec = np.array(query_vec)

    # 6. Search FAISS for similar docs
    D, I = index.search(query_vec, k=3)
    results = [docs[i] for i in I[0]]

    return jsonify({ 'context': results })

if __name__ == '__main__':
    app.run(port=8001)
