import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');

  const handleSkipLogin = () => {
    localStorage.setItem('token', 'test-token-local');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>PMP 智能閃卡系統</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        專業的間隔重複學習系統
      </p>

      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
        <p><strong>本地測試模式</strong></p>
        <p>郵箱: {email}</p>
        <p>密碼: {password}</p>
      </div>

      <button
        onClick={handleSkipLogin}
        style={{
          width: '100%',
          padding: '15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        進入應用（測試模式）
      </button>

      <p style={{ textAlign: 'center', color: '#999', marginTop: '30px', fontSize: '14px' }}>
        本地開發環境 - 點擊按鈕進入
      </p>
    </div>
  );
};
