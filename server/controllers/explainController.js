const axios  = require('axios');
exports.explainCode = async (req, res) => {
    const { code } = req.body;
    if(!code) return res.status(400).json({error: 'No code provided'});

    const prompt = `Explain the following code in simple terms:\n\n${code}`;
    try{
        const response = await axios.post('http://localhost:11434/api/generate',{
            model: 'codellama',
            prompt,
            stream: false
        })
        res.json({ explanation: response.data.response});
    }
    catch(error){
        console.error('Ollama error:', error.message);
        res.status(500).json({error: 'Failed to generate explanation'});
    }
};
