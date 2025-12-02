import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import ChatWidget from './ChatWidget';

const Layout = () => {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <ChatWidget />
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Garavel. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
