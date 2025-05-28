const axios = require('axios');

exports.explainCode = async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code snippet required' });

  try {
    // Step 1: Retrieve relevant context from Python service
    const contextRes = await axios.post('http://localhost:8001/search', { code });
    const relatedDocs = contextRes.data.context || [];

    // Step 2: Prepare full prompt for LLM
    const prompt = `Use the following context to explain the code:\n\n` +
                   `Context:\n${relatedDocs.join('\n')}\n\n` +
                   `Code:\n${code}\n\n` +
                   `Now provide a clear explanation of the code.`;

    // Step 3: Send prompt to Ollama
    const ollamaRes = await axios.post('http://localhost:11434/api/generate', {
      model: 'codellama',
      prompt,
      stream: false
    });

    // Step 4: Return the explanation
    res.json({ explanation: ollamaRes.data.response });
  } catch (err) {
    console.error('Error in /explain:', err.message);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
};
