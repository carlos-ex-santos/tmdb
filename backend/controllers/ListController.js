import FavMovie from '../models/FavMovie.js'
import User from '../models/User.js'
import jwt, { decode } from 'jsonwebtoken'
import { Op } from 'sequelize'


const listFavorite = async (req, res, next) => {
    const { username } = req.params

    var userId

    if ( req.url == '/list/me' ){
        userId = req.userId
    } else {
        userId = await User.findOne({
            where: { username: username },
            attributes: ['id', 'username']
        })

        if(userId == null){
            return res.status(404).json({error: "list not found"}) 
        }

        // Pega apenas a ID do resultado
        userId = userId.dataValues.id
    }

    const user_id = userId


    if ( user_id == null ){
        return res.status(404).json({error: "user not found"})
    }

    try {
        const listFavoriteMovies = await FavMovie.findAll({
            where: { user_id: user_id }
        })

        if ( listFavoriteMovies == 0 ){
            return res.status(404).json({error: "list not found"})
        }

        return res.status(200).json(listFavoriteMovies)
    } catch (error) {
        return res.status(400).json({error: error})
    }

}

const isFavorite = async (req, res) => {
    const { id_movie } = req.params
    const { authorization } = req.headers

    if ( !authorization ){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET)
        
        const result = await FavMovie.findOne({
            where:{
                [ Op.and ]: [{ movie_id: id_movie }, { user_id: decoded.id }]
            }
        })

        return res.status(200).json((result == null) ? false : true )
    } catch (error) {
        return res.status(401).json(error)
    }

}


export default { listFavorite, isFavorite }
