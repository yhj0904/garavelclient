import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const BoardDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/boards/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error("Failed to fetch post", error);
                navigate('/board');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id, navigate]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/boards/${id}/comments`, { content: comment });
            setComment('');
            // Refresh post to see new comment
            const response = await api.get(`/boards/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Failed to post comment", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="board-detail">
            <div className="post-content">
                <h1>{post.title}</h1>
                <div className="post-meta-detail">
                    <span>By {post.author?.full_name || 'Unknown'}</span>
                    <span>{format(new Date(post.created_at), 'PPP p')}</span>
                </div>
                <div className="post-body">
                    {post.content}
                </div>
            </div>

            <div className="comments-section">
                <h3>Comments</h3>
                <div className="comment-list">
                    {post.comments && post.comments.map(c => (
                        <div key={c.id} className="comment-card">
                            <p className="comment-author">{c.author?.full_name || 'Unknown'}</p>
                            <p className="comment-text">{c.content}</p>
                            <span className="comment-date">{format(new Date(c.created_at), 'PP p')}</span>
                        </div>
                    ))}
                </div>

                {user && (
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary">Post Comment</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BoardDetailPage;
