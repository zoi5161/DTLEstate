import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  
const API_URL = process.env.REACT_APP_API_URL;
  const isFormValid = username.trim() !== '' && password.trim() !== '';

//   const handleRegister = async () => {
//     if (!isFormValid) {
//       setErrorMessage('Vui lòng nhập đầy đủ Username và Password');
//       return;
//     }
//     setErrorMessage(''); // reset lỗi
//     try {
//       const res = await fetch(`${API_URL}/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setErrorMessage(data.message || 'Lỗi đăng ký');
//       } else {
//         setErrorMessage('');
//         alert(data.message);
//       }
//     } catch (error) {
//       setErrorMessage('Lỗi đăng ký');
//     }
//   };

  const handleLogin = async () => {
    if (!isFormValid) {
      setErrorMessage('Vui lòng nhập đầy đủ Username và Password');
      return;
    }
    setErrorMessage(''); // reset lỗi
    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setErrorMessage('');
        localStorage.setItem('token', data.token);
        navigate('/Manage');
      } else {
        setErrorMessage(data.message || 'Lỗi đăng nhập');
      }
    } catch (error) {
      setErrorMessage('Lỗi đăng nhập');
    }
  };

  return (
    <div className={styles.containerRoot}>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
        <div className={styles.errorMessage}>
            {errorMessage}
        </div>
        )}

        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={handleLogin}
            disabled={!isFormValid}
            style={{ opacity: !isFormValid ? 0.5 : 1, cursor: !isFormValid ? 'not-allowed' : 'pointer' }}
          >
            Đăng nhập
          </button>
          {/* <button
            className={styles.button}
            onClick={handleRegister}
            disabled={!isFormValid}
            style={{ opacity: !isFormValid ? 0.5 : 1, cursor: !isFormValid ? 'not-allowed' : 'pointer' }}
          >
            Đăng ký
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
