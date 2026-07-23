import { useState, useEffect, useCallback } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const [randomString, setRandomString] = useState("");
  const [copied, setCopied] = useState(false);
  const generateString = useCallback(() => {
  let characters = "";

  if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) characters += "0123456789";
  if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!characters) {
    setRandomString("");
    return;
  }

  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  setRandomString(result);
}, [
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols,
]);

useEffect(() => {
  generateString();
}, [generateString]);
  
  const copyString = async () => {
  if (!randomString) return;

  await navigator.clipboard.writeText(randomString);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

 return (
  <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-8">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          Cipher
        </h1>

        <p className="text-zinc-400 mt-2">
          Generate secure random strings for passwords, API keys and testing.
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={randomString}
          readOnly
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none"
        />

        <button
          onClick={copyString}
          className="bg-violet-600 hover:bg-violet-700 transition px-5 rounded-xl font-semibold"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-zinc-300 mb-2">
          Length: {length}
        </label>

        <input
          type="range"
          min="4"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full accent-violet-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">

        <label className="flex items-center gap-2 text-zinc-300">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Uppercase
        </label>

        <label className="flex items-center gap-2 text-zinc-300">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Lowercase
        </label>

        <label className="flex items-center gap-2 text-zinc-300">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Numbers
        </label>

        <label className="flex items-center gap-2 text-zinc-300">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Symbols
        </label>

      </div>

      <button
        onClick={generateString}
        className="w-full bg-violet-600 hover:bg-violet-700 transition py-4 rounded-xl font-bold text-lg"
      >
        Generate New String
      </button>

    </div>
  </div>
);
}

export default App;