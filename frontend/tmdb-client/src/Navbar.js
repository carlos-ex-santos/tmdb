import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken){
            axios.get(`http://localhost:4500/api/login/is-valid`,{
                headers:{authorization: authToken}
            })
            .then(response => {
                setUser(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
      }, [user]); 

    const Logout = () => {
        localStorage.removeItem('authToken')
        setUser('')
        window.location.href = '/'
    }

    return (
        <nav className="navbar navbar-expand-md navbar-expand-lg navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
            { user ?
                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 text-white">Início</a></li>
                    <li><a href="/my-favorite" className="nav-link px-2 text-white">Minha lista</a></li>
                </ul>
                : <></>
            }
                <div className="d-flex ms-auto">
                        { user ?
                            <>

                                <label className="form-label mt-2 me-2 text-white">Olá, { user ? user.first_name : '...'}</label>
                                <button className="btn btn-outline-danger" type="button" onClick={Logout}>
                                    Sair
                                </button>
                            </>
                        :
                            <>
                                <label className="form-label mt-2 me-2 text-white">Não logado</label>
                                <a href="/">
                                    <button className="btn btn-outline-success" type="button">
                                        Entrar
                                    </button>
                                </a>
                            </>
                        }
                </div>
            </div>
        </nav>
    )
}

export default Navbar