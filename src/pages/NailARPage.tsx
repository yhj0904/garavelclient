import React, { useState } from 'react';
import api from '../api/axios';

const NailARPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
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
            // Adjust endpoint based on actual API
            const response = await api.post<{ image_url: string }>('/ai/nail-ar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResultImage(response.data.image_url); // Assuming response contains URL
        } catch (error) {
            console.error("AI processing failed", error);
            alert("Failed to process image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-page">
            <h1>Nail AR Try-On</h1>
            <p>Upload a photo of your hand to see how different nail styles look!</p>

            <div className="ai-container">
                <form onSubmit={handleSubmit} className="upload-form">
                    <input type="file" onChange={handleFileChange} accept="image/*" required />
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : 'Try On'}
                    </button>
                </form>

                {resultImage && (
                    <div className="result-section">
                        <h3>Result</h3>
                        <img src={resultImage} alt="Nail AR Result" className="result-image" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NailARPage;
