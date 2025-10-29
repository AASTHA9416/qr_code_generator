import React, { useState, useEffect } from 'react';
// import './index.css'; // This import is removed to run in this environment

function App() {
  const [url, setUrl] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (qrDataUrl) {
        URL.revokeObjectURL(qrDataUrl);
      }
    };
  }, [qrDataUrl]);

  const handleGenerateQrCode = async () => {
    if (!url) {
      setErrorMessage('Please enter a URL to generate a QR code.');
      setQrDataUrl('');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    
    if (qrDataUrl) {
      URL.revokeObjectURL(qrDataUrl);
    }

    try {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch QR code from API. Please try again.');
      }
      
      const imageBlob = await response.blob();
      
      const objectUrl = URL.createObjectURL(imageBlob);
      
      setQrDataUrl(objectUrl);

    } catch (err) {
      console.error(err);
      const message = (err instanceof Error) ? err.message : 'An unknown error occurred.';
      setErrorMessage(message);
      setQrDataUrl('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!url) {
      setErrorMessage('There is no URL to download.');
      return;
    }
    const blob = new Blob([url], { type: 'text/plain' });
    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'url.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="app-container">
      
      <div className="qr-card">
        <h1 className="qr-title">
          QR Code Generator
        </h1>

        <div className="input-group">
          <label htmlFor="url-input" className="input-label">
            Enter your URL:
          </label>
          <input
            type="text"
            id="url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.google.com"
            className="url-input"
          />
        </div>

        <button
          onClick={handleGenerateQrCode}
          disabled={isLoading}
          className="generate-button"
        >
          {isLoading ? 'Generating...' : 'Generate QR Code'}
        </button>

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}

        {qrDataUrl && (
          <div className="result-container animate-fade-in">
            <img
              src={qrDataUrl}
              alt="Generated QR Code"
              className="qr-image"
            />
            
            <div className="download-buttons">
              <a
                href={qrDataUrl}
                download="qr_code.png"
                className="download-png-button"
              >
                Download PNG
              </a>

              <button
                onClick={handleDownloadTxt}
                className="download-txt-button"
              >
                Download URL (.txt)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* This style tag contains the CSS. 
        It's included here to make the preview work.
        In your local project, you should keep this
        in your separate 'index.css' file.
      */}
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          box-sizing: border-box;
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }

        .app-container {
          min-height: 100vh;
          background-color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .qr-card {
          background-color: #ffffff;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 100%;
          max-width: 32rem;
          transition: all 0.3s ease-in-out;
        }

        .qr-title {
          font-size: 1.875rem;
          font-weight: 700;
          text-align: center;
          color: #1f2937;
          margin: 0 0 1.5rem 0;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .url-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.2s;
        }

        .url-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px #3b82f6;
        }

        .generate-button {
          width: 100%;
          background-color: #2563eb;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .generate-button:hover {
          background-color: #1d4ed8;
          transform: scale(1.02);
        }

        .generate-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          color: #dc2626;
          text-align: center;
          margin-top: 1rem;
        }

        .result-container {
          margin-top: 2rem;
          text-align: center;
        }

        .qr-image {
          display: block;
          margin-left: auto;
          margin-right: auto;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 4px solid white;
        }

        .download-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .download-png-button,
        .download-txt-button {
          flex: 1;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: white;
          text-decoration: none;
          text-align: center;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .download-png-button {
          background-color: #16a34a;
        }
        .download-png-button:hover {
          background-color: #15803d;
          transform: scale(1.02);
        }

        .download-txt-button {
          background-color: #4b5563;
        }
        .download-txt-button:hover {
          background-color: #374151;
          transform: scale(1.02);
        }

        @media (min-width: 640px) {
          .download-buttons {
            flex-direction: row;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;

