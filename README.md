# Boas-vindas ao repositório do projeto API de Blogs!

<br />

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido ?</strong></summary>

  Neste projeto foi desenvolvida uma API com um banco de dados para a produção de conteúdo para um blog! 

  Foi criado em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Foram criados endpoints conectados ao banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login; 

<br />
</details>

<br />

<details>
  <summary><strong>Desempenho no projeto</strong></summary><br />
  
  <img src="blog-api-result.png" width="800px" >

</details>

# Orientações

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo.


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** Recomendado que a versão do `node` utilizada seja a 16.

  <br/>
</details>


<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary>

1. Clone o repositório
  * `git clone https://github.com/augustoomb/projeto-blogs-api.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd projeto-blogs-api`

2. Instale as dependências
  * `npm install`

<br />
</details>

<br />

# Requisitos Concluídos

## 1 - Crie migrations para as entidades Users, Categories, BlogPosts, PostCategories

- Esse teste fará uma conexão no banco utilizando a configuração de teste do arquivo `src/database/config/config.js`;
- Suas `migrations` devem estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Suas `migrations` devem respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).
- Exclua na pasta `./src/database/migrations/`, o arquivo `remove-me.js`.

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que é possível fazer um INSERT e um SELECT na tabela Users]**
    - O avaliador irá inserir um dado de exemplo na tabela `Users`;
    - O avaliador irá fazer um select, desse mesmo dado, na tabela `Users`.

  * **[Será validado que é possível fazer um INSERT e um SELECT na tabela Categories]**
    - O avaliador irá inserir um dado de exemplo na tabela `Categories`;
    - O avaliador irá fazer um select, desse mesmo dado, na tabela `Categories`.

  * **[Será validado que, a partir de um INSERT em User, é possível fazer um INSERT e um SELECT na tabela BlogPosts]**
    - Dado que `BlogPosts` possui **uma chave estrangeira** `userId`:
      - O avaliador irá inserir um dado de exemplo na tabela `Users`;
    - Desse modo:
      - O avaliador irá inserir um dado de exemplo na tabela `BlogPosts`;
      - O avaliador irá fazer um select, desse mesmo dado, na tabela `BlogPosts`.

  * **[Será validado que, a partir de INSERTs em User, Categories e BlogPosts, é possível fazer um INSERT e um SELECT na tabela PostCategories]**
    - Dado que `PostCategories` possui **uma chave primária composta de duas chaves estrangeiras**, respectivamente, `postId`, `categoryId`:
      - O avaliador irá inserir um dado de exemplo na tabela `Users`;
      - O avaliador irá inserir um dado de exemplo na tabela `Categories`;
      - O avaliador irá inserir um dado de exemplo na tabela `BlogPosts`;
    - Desse modo:
      - O avaliador irá inserir um dado de exemplo na tabela `PostCategories`;
      - O avaliador irá fazer um select, desse mesmo dado, na tabela `PostCategories`.

<br />
</details>

---

## 2 - Crie o modelo 'User' em 'src/database/models/user.js' com as propriedades corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que existe o arquivo 'user.js']**

  * **[Será validado que o modelo possui o nome 'User']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'displayName']**

  * **[Será validado que o modelo possui a propriedade 'email']**

  * **[Será validado que o modelo possui a propriedade 'password']**

  * **[Será validado que o modelo possui a propriedade 'image']**

<br />
</details>

---

## 3 - Sua aplicação deve ter o endpoint POST `/login`

- O endpoint deve ser acessível através do URL `/login`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que não é possível fazer login sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.

<br />
</details>

---

## 4 - Sua aplicação deve ter o endpoint POST `/user`

- O endpoint deve ser acessível através do URL `/user`;
- O endpoint deve ser capaz de adicionar um novo `user` a sua tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que não é possível cadastrar com o campo `displayName` menor que 8 caracteres]**
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * **[Será validado que não é possível cadastrar com o campo `email` com formato inválido]**
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * **[Será validado que não é possível cadastrar com o campo `password` menor que 6 caracteres]**
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * **[Será validado que não é possível cadastrar com um email já existente]**
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * **[Será validado que é possível cadastrar um pessoa usuária com sucesso]**
    - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.

<br />
</details>

---

## :warning: Validando token nas requisições

- Após termos feito o requisito de criação de `users` e o requisito de `login`, alguns requisitos abaixo vão precisar desta autenticação prévia, para que seja possível consumir o endpoint;
- Todo requisito que precisar validar o `token` terá o símbolo ☝;
- **✨ Dica:** Se é algo que vamos utilizar em mais de uma rota, será que podemos separa-lo em algum lugar que comece com `M` de `middleware`? 😜

<details>
  <summary id="validandoToken"><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que não é possível fazer uma operação sem o token na requisição]**
    - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```

  * **[Será validado que não é possível fazer uma operação com o token inválido]**
    - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

</details>

---

## 5 - Sua aplicação deve ter o endpoint GET `/user`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user`;
- O endpoint deve ser capaz de trazer todos `users` do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar todos os usuários]**
    - Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 6 - Sua aplicação deve ter o endpoint GET `/user/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user/:id`;
- O endpoint deve ser capaz de trazer o `user` baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar um usuário específico com sucesso]**
    - Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```

  * **[Será validado que não é possível listar um usuário inexistente]**
    - Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

<br />
</details>

---

## 7 - Crie o modelo 'Category' em 'src/database/models/category.js' com as propriedades corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'category.js']**

  * **[Será validado que o modelo possui o nome 'Category']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'name']**

<br />
</details>

---

## 8 - Sua aplicação deve ter o endpoint POST `/categories`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/categories`;
- O endpoint deve ser capaz de adicionar uma nova categoria a sua tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível cadastrar uma categoria sem o campo `name`]**
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * **[Será validado que é possível cadastrar uma categoria com sucesso]**
    - Se a categoria for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```

<br />
</details>

---

## 9 - Sua aplicação deve ter o endpoint GET `/categories`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/categories`;
- O endpoint deve ser capaz de trazer todas categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar todas as categoria com sucesso]**
    - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 10 - Crie o modelo 'BlogPost' em 'src/database/models/blogPost.js' com as propriedades e associações corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama);
- Sua `model` deve respeitar a associação correta *(N:1)* com o modelo `User`;

- **✨ Dica:**
  - Explore como renomear campos no Sequelize;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'blogPost.js']**

  * **[Será validado que o modelo possui o nome 'BlogPost']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'title']**

  * **[Será validado que o modelo possui a propriedade 'content']**

  * **[Será validado que o modelo possui a propriedade 'userId']**

  * **[Será validado que o modelo possui a propriedade 'published']**

  * **[Será validado que o modelo possui a propriedade 'updated']**

  * **[Será validado que o modelo em 'blogPost.js', define a associação 'belongsTo', com a entidade de nome 'User']**

  * **[Será validado que o modelo em 'user.js', define a associação 'hasMany', com a entidade de nome 'BlogPost']**

<br />
</details>

---

## 11 - Crie o modelo 'PostCategory' em 'src/database/models/postCategory.js' com as propriedades e associações corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama);
- Sua `model` deve respeitar a associação correta *(N:N)* entre o modelo `BlogPost` e o modelo `Category`;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'postCategory.js']**

  * **[Será validado que o modelo possui o nome 'PostCategory']**

  * **[Será validado que o modelo possui a propriedade 'postId']**

  * **[Será validado que o modelo possui a propriedade 'categoryId']**

  * **[Será validado que o modelo em 'postCategory.js', através do(s) modelos(s) de nome(s) 'Category; BlogPost', define a associação 'belongsToMany' respectivamente, com o(s) modelo(s) de nome(s) 'BlogPost, Category']**

<br />
</details>

---

## 12 - Sua aplicação deve ter o endpoint POST `/post`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post`;
- O endpoint deve ser capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
  

- **✨ Dicas:**
  - Explore outros [find na documentação do Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall);
  - Explore outros [insert na documentação do Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk);
  
<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível cadastrar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**
    - Se a requisição não tiver o campo `categoryIds` devidamente preenchido com um array com pelo menos uma categoria que exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "\"categoryIds\" not found"
    }
    ```

  * **[Será validado que é possível cadastrar um blogpost com sucesso]**
  - Se o blog post for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

## 13 - Sua aplicação deve ter o endpoint GET `/post`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post`;
- O endpoint deve ser capaz de trazer todos os blogs post, user dono dele e as categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar blogpost com sucesso]**
    - Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```

<br />
</details>

---

## 14 - Sua aplicação deve ter o endpoint GET `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de trazer o blog post baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar um blogpost com sucesso]**
    - Ao listar um post com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * **[Será validado que não é possível listar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 15 - Sua aplicação deve ter o endpoint PUT `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de alterar um post do banco de dados, se ele existir;
- Sua aplicação só deve permitir a alteração de um blog post caso a pessoa seja dona dele;
- Sua aplicação não deve permitir a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
  

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível editar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que não é possível editar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que é possível editar um blogpost com sucesso]**
    - Se o blog post for alterado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```

<br />
</details>

## 16 - Sua aplicação deve ter o endpoint DELETE `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de deletar um blog post baseado no `id` do banco de dados se ele existir;
- Sua aplicação só deve permitir a deleção de um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível deletar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que é possível deletar um blogpost com sucesso]**
    - Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

  * **[Será validado que não é possível deletar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 17 - Sua aplicação deve ter o endpoint DELETE `/user/me`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user/me`;
- O endpoint deve ser capaz de deletar você do banco de dados, baseado no `id` que esta dentro do seu `token`;
- Sua aplicação deve ser capaz de utilizar o token de autenticação nos headers, para saber o user logado correspondente á ser apagado;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível excluir meu usuário com sucesso]**
    - Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

<br />
</details>

---

## 18 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/search`;
- O endpoint deve ser capaz de trazer os blogs post baseados no `q` do banco de dados, se ele existir;
- Sua aplicação deve ser capaz de retornar um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
- Sua aplicação deve ser capaz de retornar um array vázio caso nenhum blog post satisfaça a busca;
- O query params da requisição deverá seguir o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível buscar um blogpost pelo `title`]**
    - Se a buscar for pelo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * **[Será validado que é possível buscar um blogpost pelo `content`]**
    - Se a buscar for pelo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * **[Será validado que é possível buscar todos os blogpost quando passa a busca vazia]**
    - Se a buscar for vazia o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * **[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]**
    - Se a buscar um post inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```

</details>
