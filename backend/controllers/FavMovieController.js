import FavMovie from '../models/FavMovie.js'
import { Op } from 'sequelize'

const addFavoriteMovie = async (req, res, next) => {
    const { movieId } = req.params
    const userId = req.userId

    try {
        const newFavMovie = await FavMovie.create({
            user_id: userId,
            movie_id: movieId
        })

        return res.status(200).json({success: newFavMovie})
    } catch (error) {
        return res.status(400).json({error: error})
    }

}

const removeFavoriteMovie = async (req, res, next) => {
    const { movieId } = req.params
    const userId = req.userId

    try {
        const newFavMovie = await FavMovie.destroy({
            where:{
                [ Op.and ]: [{ movie_id: movieId }, { user_id: userId }]
            }
        })

        return res.status(200).json({success: newFavMovie})
    } catch (error) {
        return res.status(400).json({error: error})
    }

}

export default { addFavoriteMovie, removeFavoriteMovie }
