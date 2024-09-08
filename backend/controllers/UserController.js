import User from "../models/User.js"
import bcrypt from "bcrypt"

const createUser = async (req, res) => {
    try {
        //Gerar hash
        const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT))
        const password = bcrypt.hashSync(req.body.password, salt)
    
        //Pegar dados da requisição
        const { username, firstName, lastName, email } = req.body

        //Salva o novo usuário no banco de dados
        const newUser = await User.create({
            username: username,
            first_name: firstName,
            last_name: lastName,
            password: password,
            email: email
        })

        //Limpa a hash da senha
        newUser.password = ""

        //retorna o novo usuário
        return res.status(201).json(newUser)
        
    } catch (error) {
        //Retorna o erro caso tenha
        return res.status(500).json({error: error})

    }

}

const updateUser = async () => {

}


export default { createUser, updateUser }