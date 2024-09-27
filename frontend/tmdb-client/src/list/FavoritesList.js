import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';


const FavoritesList = (props) => {
    const { username } = useParams()
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState('')
    const [link, setLink] = useState('')
    const urlApi = process.env.REACT_APP_API_URL
    const navigate = useNavigate();

    useEffect(() => {
        if (props.user) {
            const authToken = localStorage.getItem('authToken');

            if(authToken){
                axios.get(`${urlApi}/login/is-valid`, {
                    headers: { Authorization: authToken }
                })
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Erro ao fazer a requisição:', error);
                });
            }
        }
    }, [props.user]);

    useEffect(() => {
        const host = window.location.host

        const currentUsername = props.user ? user.username : username;

        if (props.user && !user.username) return;

        if (typeof currentUsername === 'string') {
            axios.get(`${urlApi}/list/${currentUsername}`)
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {
                if(error.status === 404){
                    setMovies([])
                }
            });
        }else if (props.user && currentUsername === undefined){
            navigate("/")
        }
    }, [user.username, username, props.user, navigate]);


    return (
        <>
        <Navbar />
        <main className="mt-3">
            <div className="album py-5 bg-body-tertiary h-100">
                <div className="container">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light text-center">
                            { props.user ? "Minha lista" 
                            :<>Lista do usuário <strong>{username}</strong></>}</h1> 
                    </div>
                    <br/>
                    { movies ? (
                        movies.map(item =>(
                            <Card key={item.movie_id} id={item.movie_id} />
                        ))
                    ) : (
                        <strong>Nenhum filme adicionado</strong>
                    ) }
                </div>
            </div>
        </main>
        </>
    )
}

export default FavoritesList