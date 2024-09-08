import express from "express"
import Login from "../controllers/LoginController.js"

const router = express.Router()

router.post('/login', Login.login)
router.get('/login/is-valid', Login.isValid)

export default router