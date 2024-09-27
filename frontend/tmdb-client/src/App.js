import React ,{ useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Card from "./list/Card";

const App = () => {
    const [movies, setMovies] = useState(null)
    const [title, setTitle] = useState('');
    const urlApi = process.env.REACT_APP_API_URL

    const Search = () => {
        axios.post(`${urlApi}/movie`, {
            title: title
        }).then(response => {
            console.log(response.data)
            setMovies(response.data.result)
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
            setMovies(null)
        })
    }

    useEffect(() => {
        const keyDownHandler = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            const searchButton = document.getElementById('search');
            if (searchButton) {
                searchButton.click();
            }
          }
        };
    
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    },[])

  
    useEffect(() => {
          axios.get(`${urlApi}/movie/popular`)
            .then(response => {
              setMovies(response.data.results.slice(0, 10))
            })
            .catch(error => {
              console.error('Erro ao fazer a requisição:', error);
              setMovies(null)
            });
    }, []);

    return (
        <>
            <Navbar />
            <main className="container-fluid mt-3">
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="input-group mb-3 mt-5">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar por um filme" 
                            aria-label="Buscar por um filme" 
                            aria-describedby="search" 
                            name="title"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}/>
                        <button className="btn btn-success" onClick={Search} type="button" id="search" name="search">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: -2 }} width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="col-lg-6 col-md-8 mb-5 mx-auto text-center">
                        <h1 className="fw-light">Top 10</h1>
                    </div>
                    { movies ? (
                        movies.map(item =>(
                            <Card key={item.id} id={item.id} />
                        ))
                    ) : (
                        <strong>Nenhum filme encontrado</strong>
                    ) }
                    </div>
            </div>
        </main>
        </>
    )
}

export default App