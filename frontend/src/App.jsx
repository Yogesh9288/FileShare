import { useEffect, useRef, useState } from "react";
import { uploadFile } from "./service/api.js";

function App() {
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [copied, setCopied] = useState(false);

  const uploadRef = useRef();

  const handleUpload = () => {
    uploadRef.current.click();
  };

  const handleCopy = () => {
    if (res) {
      navigator.clipboard.writeText(res);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpen = () => {
    if (res) {
      window.open(res, "_blank");
    }
  };

  useEffect(() => {
    const apiCall = async () => {
      if (file) {
        const fileData = new FormData();
        fileData.append("name", file.name);
        fileData.append("file", file);

        const response = await uploadFile(fileData);
        setRes(response?.path);
        console.log("FULL RESPONSE:", response);
      }
    };
    apiCall();
  }, [file]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          File Sharing App
        </h1>

        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Upload File
          </button>

          <input
            type="file"
            ref={uploadRef}
            className="hidden"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>

        {res && (
          <div className="mt-4 flex flex-col gap-3 bg-gray-50 border rounded-lg p-4">
            <a
              href={res}
              className="text-sm text-indigo-600 break-all hover:underline"
            >
              {res}
            </a>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleCopy}
                className="px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
              >
                {copied ? (
                  <span className="text-lg font-bold">✔</span>
                ) : (
                  "Copy"
                )}
              </button>

              <button
                onClick={handleOpen}
                className="px-4 py-1.5 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
