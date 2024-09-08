import express from "express"
import FavMovie from "../controllers/FavMovieController.js"
import Login from "../controllers/LoginController.js"

const router = express.Router()

router.post('/favorite/:movieId/add', Login.verify, FavMovie.addFavoriteMovie)
router.post('/favorite/:movieId/remove', Login.verify, FavMovie.removeFavoriteMovie)

export default router