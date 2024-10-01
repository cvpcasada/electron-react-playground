import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';
import {useQuery} from '@tanstack/react-query';
function App() {
  const [count, setCount] = useState(0);

  const testLocalFileFetch = useQuery({
    queryKey: ['test-local-file-fetch'],
    queryFn: async () => {
      const response = await fetch(
        'cfile:///Users/cyrus/Projects/electron-protocol-example/packages/renderer/assets/test-local-file-fetch.json',
      );
      return response.json();
    },
  });

  return (
    <>
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
        >
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
        >
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
      <div style={{textAlign: 'left'}}>
        <p>Test local file fetch</p>
        <div>
          <code>
            const response = await fetch(
            'cfile:///Users/cyrus/Projects/electron-protocol-example/packages/renderer/assets/test-local-file-fetch.json',
            ); return response.json();
          </code>
        </div>
        <strong>Response:</strong>
        <pre>
          {testLocalFileFetch.isLoading
            ? 'Loading...'
            : testLocalFileFetch.isError
            ? JSON.stringify(testLocalFileFetch.error)
            : JSON.stringify(testLocalFileFetch.data)}
        </pre>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
