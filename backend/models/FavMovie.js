import { DataTypes } from "sequelize";
import db from "../conf/database.js"
import User from "./User.js";

const FavMovie = db.define(
    'fav_movie',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)

User.hasMany(FavMovie, { foreignKey: 'user_id' });
FavMovie.belongsTo(User, { foreignKey: 'user_id' });

export default FavMovie