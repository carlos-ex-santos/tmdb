import  React , { useEffect, useState } from 'react'
import axios from 'axios';
import FavoriteButton from './FavoriteButton';

const Card = (prop) => {

    const [movie, setMovie] = useState(null);
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        axios.get(`http://localhost:4500/api/movie/${prop.id}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.error('Erro ao fazer a requisição:', error);
                setMovie(null)
            })

        axios.get("http://localhost:4500/api/login/is-valid",{
            headers:{ Authorization: authToken }
        })
            .then(response => {
                setSession(true);
            })
            .catch(error => {
                console.error('Erro ao fazer a requisição:', error);
                setSession(false);
            })


      }, [prop.id]);


    return (
        <div className="col">
            <div className="row mb-2">
                <div className="col-md-12">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col-auto d-none d-lg-block">
                            {
                                movie ? 
                                    (movie.poster_path == null ) ? 
                                        <svg className="bd-placeholder-img d-flex" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>No image</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="35%" y="50%" fill="#eceeef" dy=".3em">No image</text></svg>                        
                                    : 
                                        <img className="bd-placeholder-img card-img-top" width="200" height="250" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} focusable="false" />
                                : 
                                <svg className="bd-placeholder-img d-flex" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>                        
                            }
                        </div>
                        <div className="col p-4 d-flex flex-column position-static">
                            <h3 className="mb-0">{movie ? movie.title : 'Carregando...'}</h3>
                            <div className="mb-1 text-body-secondary">
                                {movie ? (
                                    movie.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            {genre.name}
                                            {index < movie.genres.length - 1 ? ", " : ""}
                                        </span>
                                    ))
                                ) : "Carregando..."}
                            </div>
                            <p className="card-text mb-auto small">{movie ? movie.overview : 'Carregando...'}</p>
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                { session ? 
                                    movie ? <FavoriteButton id_movie={movie.id} /> : <></>
                                :<></> }
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                { movie ? <a href={`/movie/${movie.id}`} target="_blank" className="icon-link gap-1 icon-link-hover d-flex">Ver mais</a>: ''}
                                <small className="text-body-secondary d-flex align-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: 4}} width="15" height="15" fill="currentColor" className="bi bi-clock me-1" viewBox="0 0 16 16">
                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                                    </svg>
                                    <label className="">{movie ? movie.runtime : 'N/A'} min</label>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card