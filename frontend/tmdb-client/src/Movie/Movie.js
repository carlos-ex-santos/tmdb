import  React , { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import FavoriteButton from '../list/FavoriteButton';


const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [err, setErr] = useState(null)
    const urlApi = process.env.REACT_APP_API_URL
    const url = `${urlApi}/movie/${id}`

    useEffect(() => {
        console.log(isNaN(id))
        if (isNaN(id)){
            setErr(true)
        }

        axios.get(url)
          .then(response => {
            setMovie(response.data)
          })
          .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            setMovie(null)
            setErr(true)
          });
    }, [id]);

    console.log(movie)

    return(
        <>
        <Navbar />
        {
        err ? 
        <main class="mt-5">
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">                                     
                        <strong>Filme não encontrado</strong>
                    </div>
                </div>
            </div>
        </main>
        : 
        <div class="m-5 pt-4">
            <div class="row g-0 rounded flex-md-row m-5 h-md-250 position-relative">
                <div class="col-auto">
                    {movie?
                        (movie.poster_path == null) ?
                            <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Carregando...</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="35%" y="50%" fill="#eceeef" dy=".3em">No image</text></svg>
                        :<img className="bd-placeholder-img" style={{ width: 200}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} focusable="false" />
                    :<svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Carregando...</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Carregando...</text></svg>}
                
                </div>
                <div class="col p-4 d-flex flex-column position-static me-5">
                    <h3 class="mb-0">{ movie ? movie.title : "Carregando..." }</h3>
                    <div class="mb-1 text-body-secondary">
                        {movie ? (
                            movie.genres.map((genre, index) => (
                                <span key={genre.id}>
                                    {genre.name}
                                    {index < movie.genres.length - 1 ? ", " : ""}
                                </span>
                            ))
                        ) : "Carregando..."}
                    </div>
                    <p class="card-text mb-1"><strong>Sinopse: </strong>{ movie ? movie.overview : "Carregando..." }</p>
                    <p class="card-text mb-1"><strong>Duração: </strong>{movie ? movie.runtime : 'N/A'} min</p>
                    <p class="card-text mb-1"><strong>Nota: </strong>{movie ? movie.vote_average.toFixed(2) : 'N/A'}</p>
                    <p class="card-text mb-1"><strong>Produtoras: </strong> 
                        {movie ? (
                            movie.production_companies.map((production_company, index) => (
                                <span key={production_company.id}>
                                    {production_company.name}
                                    {index < movie.production_companies.length - 1 ? ", " : ""}
                                </span>
                            ))
                        ) : "Carregando..."}
                    </p>
                    { movie ? <FavoriteButton id_movie={movie.id} /> : <></>}
                    
                </div>
        </div>
      </div>
              }
      </>
    )
}

export default Movie