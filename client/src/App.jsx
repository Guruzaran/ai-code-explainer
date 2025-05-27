import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('// Paste your code here...');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleExplain = async () => {
    setLoading(true);
    setExplanation('');
    try {
      const res = await axios.post('http://localhost:5000/api/explain', { code });
      setExplanation(res.data.explanation);
    } catch (err) {
      setExplanation('Something went wrong while explaining the code.');
    }
    setLoading(false);
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen p-4 sm:p-6 md:p-10`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center w-full">🧠 AI Code Explainer</h1>
          <button
            onClick={toggleTheme}
            className="text-sm border px-3 py-1 rounded ml-4"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="rounded-md overflow-hidden shadow-md border border-gray-300">
          <Editor
            height="40vh"
            defaultLanguage="javascript"
            theme={darkMode ? 'vs-dark' : 'light'}
            value={code}
            onChange={(val) => setCode(val || '')}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleExplain}
            disabled={loading}
            className={`px-6 py-2 rounded-md ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white disabled:opacity-50`}
          >
            {loading ? 'Explaining...' : 'Explain Code'}
          </button>
        </div>

        <div className={`mt-10 p-6 rounded-md shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="text-2xl font-semibold mb-3">💬 Explanation</h2>
          <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-lg leading-relaxed">
            {explanation ? explanation : 'Explanation will appear here.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
