import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('登入失敗');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username: email.split('@')[0]
        })
      });

      if (!response.ok) {
        throw new Error('註冊失敗');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '發生錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  // 快速跳過登入用於測試
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

      <form onSubmit={handleLogin} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>郵箱</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>
            <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>密碼</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              required
            />
          </label>
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px',
            fontSize: '16px'
          }}
        >
          {isLoading ? '登入中...' : '登入'}
        </button>

        <button
          type="button"
          onClick={handleRegister}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isLoading ? '註冊中...' : '建立新帳戶'}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <p style={{ color: '#999' }}>— 或 —</p>
      </div>

      <button
        onClick={handleSkipLogin}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        測試模式（跳過登入）
      </button>

      <p style={{ textAlign: 'center', color: '#999', marginTop: '30px', fontSize: '14px' }}>
        本地開發環境 - 點擊「測試模式」直接進入應用
      </p>
    </div>
  );
};
