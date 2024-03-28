## Backend - Wefit

Seja bem vindo ao teste de backend da Wefit.

### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -D

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **root** é **senha_root_123**

### Antes de Iniciar o servidor executar o seguinte comando:
    npm run migrate

### Para rodar os testes basta executar o seguinte comando:
    npm run test

### Para acesar docs e so coloca no browser essa url:
    http://localhost:3000/docs

### Para iniciar o servidor express basta executar o seguinte comando:

    npm start
    ou
    yarn start

Depois que concluir seu teste não de enviar o seu código junto a pasta data, nela está salvo o volume do MySQL criado pelo docker.

Boa sorte =)
