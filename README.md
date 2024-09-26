# Lista de Filmes

O projeto tem o intuito de consumir a API do TMDb gerando uma View com React e consumindo com Node.JS

# Instalação

O projeto está dividido nas pastas Backend (node.js) e Frontend (React)

Primeiro de tudo, crie uma database no seu MySQL com o nome tmdb_server

Após criação, pode abrir a pasta Backend e executar o comando ```npm install```

Apos a instalação, abra o arquivo .env.example.env 

Em TMDB_API_KEY informe a sua chave da API do TMDb
Logo abaixo, você terá as variáveis de configuração do MySQL, informe o host, o usuário, a senha e a porta do seu MySQL.
Em JWT_SECRET informe uma chave para codificação do JWT
Por último, informe o host e a porta do seu servidor Node.JS

Após realizar as configurações no arquivo .env.example.env, renomeie o mesmo para .env, ainda na pasta backend execute o comando ```node sync.js``` para que a aplicação crie as tabelas necessárias.
Realizado a criação execute o comando ```npm start``` para iniciar o servidor backend

Depois disso acesse a pasta frontend e a pasta tmdb-client e execute o comando ```npm install``` para instalar os módulos e dependências e depois execute o comando ```npm start```

# Observações

Para compartilhar a lista basta abrir o link do frontend mais /list/username (Exemplo: localhost:8000/list/carlos-ex-santos

O projeto será fatorado futuramente para diminuir a repetição de códigos e evitar possíveis erros

