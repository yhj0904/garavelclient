import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Calendar } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (): void => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Garavel
                </Link>
                <div className="navbar-links">
                    {user ? (
                        <>
                            <Link to="/booking" className="nav-link">
                                <Calendar size={18} />
                                Booking
                            </Link>
                            <Link to="/board" className="nav-link">
                                Community
                            </Link>
                            <Link to="/ai/nail" className="nav-link">
                                Nail AR
                            </Link>
                            <Link to="/ai/volume" className="nav-link">
                                Volume
                            </Link>
                            <Link to="/mypage" className="nav-link">
                                <User size={18} />
                                My Page
                            </Link>
                            <span className="user-info">
                                {user.name || user.email}
                            </span>
                            <button onClick={handleLogout} className="btn-logout">
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
