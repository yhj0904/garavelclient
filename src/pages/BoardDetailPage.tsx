import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

interface Author {
    id: number;
    name: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    author?: Author;
}

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
    author?: Author;
    comments?: Comment[];
}

const BoardDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [comment, setComment] = useState<string>('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async (): Promise<void> => {
            try {
                const response = await api.get<Post>(`/boards/${id}`);
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

    const handleCommentSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            await api.post(`/boards/${id}/comments`, { content: comment });
            setComment('');
            // Refresh post to see new comment
            const response = await api.get<Post>(`/boards/${id}`);
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
                    <span>By {post.author?.name || 'Unknown'}</span>
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
                            <p className="comment-author">{c.author?.name || 'Unknown'}</p>
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
