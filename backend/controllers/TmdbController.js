import axios from "axios"
import 'dotenv/config'


const getMovieDetails = async (req, res) => {
    const { id } = req.params
    try {
        const response = await axios.get(`${process.env.TMDB_API_URL}/movie/${id}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'pt-BR'
            }
        });
        return res.status(200).json(response.data)
    } catch ( error ) {
        return res.status(404).json({ error:error })
    }
}

const searchMovieByTitle = async (req, res) => {
    const { title } = req.body

    if ( !title ) {
        return res.status(400).json({error: "Title isn't empty"})
    }

    try {
        const response = await axios.get(`${process.env.TMDB_API_URL}/search/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query: title,
                language: 'pt-BR'
            }
        });
        return res.status(200).json({result: response.data.results})
    } catch (error) {
        return res.status(403).json({error: error})
    }
}

export default { getMovieDetails, searchMovieByTitle }