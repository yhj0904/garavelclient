import React, { useState } from 'react';
import api from '../api/axios';

interface VolumeResult {
    volume: number;
    width: number;
    height: number;
    depth: number;
}

const VolumePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [result, setResult] = useState<VolumeResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await api.post<VolumeResult>('/ai/volume', formData, {
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
