import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import BookingList from '../components/BookingList';

interface Booking {
    id: number;
    booking_time: string;
    status: string;
    branch?: {
        id: number;
        name: string;
    };
    service?: {
        id: number;
        name: string;
    };
    notes?: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
}

interface Favorite {
    id: number;
    target_type: string;
    target_id: number;
}

type TabType = 'bookings' | 'reviews' | 'favorites';

const MyPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<TabType>('bookings');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setLoading(true);
            try {
                if (activeTab === 'bookings') {
                    const res = await api.get<Booking[] | { items: Booking[] }>('/bookings/me');
                    setBookings(Array.isArray(res.data) ? res.data : res.data.items || []);
                } else if (activeTab === 'reviews') {
                    const res = await api.get<Review[] | { items: Review[] }>('/reviews/me');
                    setReviews(Array.isArray(res.data) ? res.data : res.data.items || []);
                } else if (activeTab === 'favorites') {
                    const res = await api.get<Favorite[] | { items: Favorite[] }>('/favorites/me');
                    setFavorites(Array.isArray(res.data) ? res.data : res.data.items || []);
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeTab}`, error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [activeTab, user]);

    if (!user) return <p>Please log in.</p>;

    return (
        <div className="mypage">
            <h1>My Page</h1>
            <div className="mypage-header">
                <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            </div>

            <div className="mypage-tabs">
                <button
                    className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                >
                    My Bookings
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    My Reviews
                </button>
                <button
                    className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
            </div>

            <div className="mypage-content">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {activeTab === 'bookings' && <BookingList bookings={bookings} />}
                        {activeTab === 'reviews' && (
                            <div className="review-list">
                                {reviews.length === 0 ? <p className="no-data">No reviews yet.</p> : (
                                    reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <p><strong>Rating:</strong> {review.rating}/5</p>
                                            <p>{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                        {activeTab === 'favorites' && (
                            <div className="favorite-list">
                                {favorites.length === 0 ? <p className="no-data">No favorites yet.</p> : (
                                    favorites.map(fav => (
                                        <div key={fav.id} className="favorite-card">
                                            <p>{fav.target_type}: {fav.target_id}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyPage;
