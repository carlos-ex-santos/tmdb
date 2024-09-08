import express from 'express'
import db from './conf/database.js'
import cors from 'cors'
import 'dotenv/config'

// import dos arquivos das rotas
import userRoutes from './routes/userRoutes.js'
import loginRoutes from './routes/loginRoutes.js'
import tmdbRoutes from './routes/tmdbRoutes.js'
import FavMovieRoutes from './routes/favMovieRoutes.js'
import ListRoutes from './routes/listFavoriteRoutes.js'

const app = express();

// utilizar o json como forma de requisição
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
});

// aplicar as rotas na API
app.use('/api', userRoutes);
app.use('/api', loginRoutes);
app.use('/api', tmdbRoutes);
app.use('/api', FavMovieRoutes);
app.use('/api', ListRoutes);

// função para iniciar o servidor na porta designada e sincroniza o banco de dados
const startServer = async () => {
  try {
    await db.sync();
    app.listen(process.env.PORT, () => {
        console.log('Server is running on port ', process.env.PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// chama a função de iniciar o servidor
startServer();
