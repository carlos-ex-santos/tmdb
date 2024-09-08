import express from "express"
import Login from "../controllers/LoginController.js"
import List from "../controllers/ListController.js"

const router = express.Router()

router.get('/list/me', Login.verify, List.listFavorite)
router.get('/list/:username', List.listFavorite)
router.get('/favorite/:id_movie', List.isFavorite)

export default router