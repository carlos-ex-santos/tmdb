import 'dotenv/config'
import { Sequelize } from 'sequelize'

const db = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql"
})

export default db