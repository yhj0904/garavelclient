import React, { useState } from 'react';
import api from '../api/axios';

const VolumePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await api.post('/ai/volume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        } catch (error) {
            console.error("Volume calculation failed", error);
            alert("Failed to calculate volume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-page">
            <h1>Volume Prediction</h1>
            <p>Upload a photo of a box to calculate its volume.</p>

            <div className="ai-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <input type="file" onChange={handleFileChange} accept="image/*" required />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Calculating...' : 'Calculate Volume'}
                    </button>
                </form>

                {result && (
                    <div className="result-section">
                        <h3>Result</h3>
                        <div className="volume-result">
                            <p><strong>Estimated Volume:</strong> {result.volume} cm³</p>
                            <p><strong>Dimensions:</strong> {result.width} x {result.height} x {result.depth} cm</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VolumePage;
