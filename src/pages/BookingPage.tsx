import React, { useState, useEffect } from 'react';
import api from '../api/axios';

interface Branch {
    id: number;
    name: string;
}

const BookingPage: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        // Fetch branches
        const fetchBranches = async (): Promise<void> => {
            try {
                const response = await api.get<Branch[] | { items: Branch[] }>('/branches');
                // Adjust based on actual API response structure
                // Assuming response.data is a list or response.data.items
                setBranches(Array.isArray(response.data) ? response.data : response.data.items || []);
            } catch (error) {
                console.error("Failed to fetch branches", error);
            }
        };
        fetchBranches();
    }, []);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            await api.post('/bookings', {
                branch_id: selectedBranch,
                booking_time: `${date}T${time}:00`, // ISO format
                notes: message
            });
            alert('Booking created successfully!');
        } catch (error) {
            console.error("Booking failed", error);
            alert('Failed to create booking.');
        }
    };

    return (
        <div className="booking-page">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label>Select Branch</label>
                    <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        required
                    >
                        <option value="">-- Select Branch --</option>
                        {branches.map(branch => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Notes</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookingPage;
