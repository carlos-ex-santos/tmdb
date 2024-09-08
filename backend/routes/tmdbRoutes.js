import express from "express"
import Tmdb from "../controllers/TmdbController.js"

const router = express.Router()

router.post('/movie', Tmdb.searchMovieByTitle)
router.get('/movie/:id', Tmdb.getMovieDetails)

export default router