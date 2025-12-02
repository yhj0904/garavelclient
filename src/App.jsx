import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingPage from './pages/BookingPage';
import MyPage from './pages/MyPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWritePage from './pages/BoardWritePage';
import NailARPage from './pages/NailARPage';
import VolumePage from './pages/VolumePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="board" element={<BoardListPage />} />
            <Route path="board/write" element={<BoardWritePage />} />
            <Route path="board/:id" element={<BoardDetailPage />} />
            <Route path="ai/nail" element={<NailARPage />} />
            <Route path="ai/volume" element={<VolumePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
