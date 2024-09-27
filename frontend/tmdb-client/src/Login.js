import React, { useState, useEffect } from 'react';
import axios from 'axios';
import App from './App'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [token, setToken] = useState('');
  const buttonSubmit = document.getElementById('login');
  const urlApi = process.env.REACT_APP_API_URL

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setToken(authToken);
    }
  }, []); 

  const loginSubmit = async (e) => {
    e.preventDefault();
    buttonSubmit.disabled = true
    try {
      const response = await axios.post(`${urlApi}/login`, { username, password });
      localStorage.setItem('authToken', response.data.token)
      setToken(response.data.token)
    } catch (error) {
      console.error('Erro ao fazer login', error);
      if(error.status === 401){
        setErr('Usuário e/ou senha incorretos')
      }
    }
  };

  return (
    <>
      {token ? (
        <App />
      ) : (
        <main className="form-signin bg-light d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="col-lg-3 col-md-6 col-sm-9 col-xs-12">
            <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
            <div className="form-floating" id="res">
              {err && (
                <div className="alert alert-danger" role="alert">
                  {err}
                </div>
              )}
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="username">Nome de usuário</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    loginSubmit(e);
                  }
                }}
              />
              <label htmlFor="password">Senha</label>
            </div>
            <div className="mt-1">
              <a href="#">Esqueceu a senha</a>
            </div>
            <button onClick={loginSubmit} className="btn btn-primary py-2 mt-4" id="login" type="submit">
              Entrar
            </button>
            <div className="mt-1">
              Ainda não tem conta? <a href="/register">Registre-se</a>
            </div>
          </div>
          <p className="mt-5 text-body-secondary text-center fixed-bottom">© 2024</p>
        </main>
      )}
    </>
  );
};

export default Login;
