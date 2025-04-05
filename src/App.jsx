import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Buffer } from 'buffer';

const App = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [allPdfs, setAllPdfs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);

    const showPdf = async (pdfId) => {
        try {
            const response = await axios.get(`http://localhost:5000/view-pdf/${pdfId}`, {
                responseType: 'blob'
            });

            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            setSelectedPdfUrl(fileURL);
        } catch (error) {
            console.error('Error viewing PDF:', error);
        }
    };
    const submitImage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("file", file);

            await axios.post("http://localhost:5000/upload-files", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            // Refresh the PDF list after successful upload
            await getPdf();
            setTitle("");
            setFile(null);
            e.target.reset();
        } catch (err) {
            setError("Failed to upload PDF. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getPdf = async () => {
        try {
            const result = await axios.get("http://localhost:5000/get-files");
            setAllPdfs(result.data.data || []);
        } catch (err) {
            setError("Failed to fetch PDFs. Please try again.");
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        getPdf();
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            {/* Upload Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={submitImage}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Document Upload
                    </h4>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Title"
                            value={title}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="pdf" className="block text-sm font-medium text-gray-700 mb-1">
                            PDF File *
                        </label>
                        <input
                            type="file"
                            id="pdf"
                            accept=".pdf"
                            required
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <p className="mt-1 text-xs text-gray-500">Only PDF files are accepted</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
            </div>

            {/* Uploaded PDFs List */}
            {allPdfs.map((pdf, index) => (
                <div key={pdf._id} className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50">
                    <h6 className="text-md font-medium text-gray-700 mb-2">Title: {pdf.title}</h6>
                    <div className="space-x-2">
                        <button
                            onClick={() => showPdf(pdf._id)}
                            className="inline-block bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                        >
                            Preview PDF
                        </button>
                        <a
                            href={`http://localhost:5000/download/${pdf._id}`}
                            download={pdf.title}
                            className="inline-block bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition duration-200 text-sm"
                        >
                            Download
                        </a>
                    </div>
                </div>
            ))}

            {allPdfs.length === 0 && !isLoading && (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                    No PDFs uploaded yet.
                </div>
            )}
            {selectedPdfUrl && (
                <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">PDF Preview</h4>
                    <iframe
                        src={selectedPdfUrl}
                        className="w-full h-[800px]" // Adjust height as needed
                        title="PDF Preview"
                    />
                </div>
            )}
        </div>
    );
};

export default App;