exports.explainCode = async (req, res) => {
    const { code } = req.body;
    if(!code) return res.status(400).json({error: 'No code provided'});
    res.json({ explanation: `Explanation for:\n ${code}` });
};
