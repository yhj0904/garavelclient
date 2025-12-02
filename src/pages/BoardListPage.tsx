import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';

interface Author {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    created_at: string;
    author?: Author;
}

const BoardListPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            try {
                const response = await api.get<Post[] | { items: Post[] }>('/boards');
                setPosts(Array.isArray(response.data) ? response.data : response.data.items || []);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="board-page">
            <div className="board-header">
                <h1>Community Board</h1>
                <Link to="/board/write" className="btn btn-primary">Write Post</Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="post-list">
                    {posts.length === 0 ? (
                        <p className="no-data">No posts yet.</p>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="post-card">
                                <Link to={`/board/${post.id}`} className="post-title">
                                    {post.title}
                                </Link>
                                <div className="post-meta">
                                    <span>By {post.author?.name || 'Unknown'}</span>
                                    <span>{format(new Date(post.created_at), 'PPP')}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default BoardListPage;
