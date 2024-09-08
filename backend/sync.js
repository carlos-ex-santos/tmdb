import db from "./conf/database.js"
import User from "./model/User.js"
import FavMovie from "./model/FavMovie.js"

(async () => {
    try{
        await db.sync({ force: true })
        console.log("Tables created successfully")
    } catch(error) {
        console.error("Can't sync database!\nError: ", error)
    } finally {
        await db.close()
    }
})()