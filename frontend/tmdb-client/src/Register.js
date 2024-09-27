import React, { useState, useNavigate } from 'react';
import App from './App'
import Request from './functions/Request';

const Register = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [err, setErr] = useState('');
  const [token, setToken] = useState('');
  const buttonSubmit = document.getElementById('register');
  const navigate = useNavigate()
  
  const validatePass = (pass, repass) => {
        if (pass.length > 0 && repass.length > 0) {
            if (pass !== repass) {
                setErr('Senhas não são iguais');
                buttonSubmit.disabled = true
            } else {
                setErr('');
                buttonSubmit.disabled = false
            }
        }
    }

    const userExist = async (username) => {
            const data = await Request.get(`/list/${username}`)
            if (data.status == 200){
                buttonSubmit.disabled=true
                setErr("Nome de usuário já existe")
            } else {
                buttonSubmit.disabled=false
                setErr('')
            }
    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = {
                username: username,
                firstName: firstname,
                lastName: lastname,
                email: email,
                password: password 
            }

            const response = await Request.post('/register', data);
            if (response.status === 201){
                try{
                    buttonSubmit.disabled = true
                    const response = await Request.post('/login', data)
                    setToken(response.data.token)
                    localStorage.setItem('authToken', response.data.token)
                    navigate("/")
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (error) {
            console.log(error)
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
            <h1 className="h3 mb-3 fw-normal text-center">Cadastre-se</h1>
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
                onBlur={(e) => userExist(e.target.value)}
              />
              <label htmlFor="username">Nome de usuário</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Primeiro nome"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label htmlFor="firstname">Primeiro nome</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Sobrenome"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label htmlFor="lastname">Sobrenome</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form-floating">
            <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePass(e.target.value, repassword);
                }}
                />
              <label htmlFor="password">Senha</label>
            </div>
            <div className="form-floating">
            <input
                type="password"
                className="form-control"
                id="repassword"
                placeholder="Confirme sua Senha"
                value={repassword}
                onChange={(e) => {
                  setRepassword(e.target.value);
                  validatePass(password, e.target.value);
                }}
              />
              <label htmlFor="password">Confirme sua senha</label>
            </div>
            <button 
                onClick={registerSubmit} 
                className="btn btn-primary py-2 mt-4" 
                id="register" 
                type="submit"
                >
              Cadastrar
            </button>
            <div className="mt-1">
              Já tem conta? <a href="/">Entre</a>
            </div>
          </div>
          <p className="mt-5 text-body-secondary text-center fixed-bottom">© 2024</p>
        </main>
      )}
    </>
  );
};

export default Register;
