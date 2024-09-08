import express from "express"
import User from "../controllers/UserController.js"

const router = express.Router()

router.post('/register', User.createUser)

export default router