import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (req, res) => {
    try{
        const { username, password } = req.body
        //Busca por usuário
        const user = await User.findOne({
            where:{ username: username }, 
            attributes: ['id', 'username', 'first_name', 'password' ]
        })

        //Verifica se retornou algum usuário
        if (user == null){
            return res.status(401).json({error: "invalid credentials"})
        }
        
        //Compara a hash do usuário com a senha informada
        const authPass = bcrypt.compareSync(password, user.password)
        
        //Caso a hash retorne false, apresenta erro de autenticação
        if( !authPass ){
            return res.status(401).json({error: "invalid credentials"})
        }

        //Cria um jwt de autenticação para o usuário
        const token = jwt.sign({
            id: user.id,
            username: user.username,
            first_name: user.first_name
        }, process.env.JWT_SECRET,{
            //Validade do token, 8 horas
            expiresIn: 8 * 60 * 60
        })

        return res.status(200).json({token: token})
    } catch ( error ) {
        return res.status(500).json({ error: error })
    }
}


const verify = (req, res, next) => {
    //realiza a captura do token na requisição
    const token = req.headers['authorization']

    //verifica se o token existe
    if ( !token ){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    //verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        
        if (err) {
            const [, msgErr] = String(err).split(':') 
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.'+msgErr });
        }

        //retorna a ID do usuário
        req.userId = decoded.id;
        next()
    })

}

const isValid = async (req, res) => {
    const token = req.headers['authorization']

    //verifica se o token existe
    if ( !token ){
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json(decoded)        
    } catch (error) {
        return res.status(401).json(error)
    }
}

export default { login, verify, isValid }