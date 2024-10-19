# HR_PROJECT

### ⚙️ Para rodar o projeto localmente:

- Altere para a branch que contém as features mais recentes que você deseja trabalhar (por padrão, use sempre a **develop**)
- Primeiro, instale todas as dependências com `npm install` .
- Este projeto está configurado com banco de dados Postgres. Certifique-se de ter o PostgreSQL instalado em sua máquina e um usuário criado com permissão de leitura e escrita.
- Para permitir ao Prisma acesso ao banco de dados, altere a linha `DATABASE_URL` do arquivo `.env` com o seguinte padrão:
  ```tsx
  DATABASE_URL = 'postgres://USER:PASSWORD@localhost:5432/hr_db?schema=public';
  ```
  onde **USER** é o usuário com acesso e **PASSWORD** a senha (manter somente o usuário caso não tenha senha, sem os dois pontos). Por padrão, o banco roda na porta 5432 e o nome do DB é `hr_db`.
- Para rodar as migrations do banco de dados mais atuais, rode no terminal: `npx prisma migrate dev`. Em caso de sucesso, o Prisma irá se conectar ao Postgres, criar o banco e todas as tabelas descritas no arquivo `schema.prisma` automaticamente.
- Feito estes passos, é possível rodar o projeto com o comando `npm run start:dev`. As rotas serão listadas e estarão disponíveis na url `http://localhost:3000`

---

## English Version

### ⚙️ To run the project locally:

- Switch to the branch that contains the latest features you want to work on (by default, always use **develop**)
- First, install all dependencies with `npm install`.
- This project is set up with a Postgres database. Make sure you have PostgreSQL installed on your machine and a user created with read and write permission.
- To allow Prisma access to the database, change the `DATABASE_URL` line in the `.env` file to the following pattern:
  ```tsx
  DATABASE_URL = 'postgres://USER:PASSWORD@localhost:5432/hr_db?schema=public';
  ```
  where **USER** is the user with access and **PASSWORD** is the password (keep only the user if there is no password, without the colons). By default, the database runs on port 5432 and the DB name is `hr_db`.
- To run the latest database migrations, run in the terminal: `npx prisma migrate dev`. If successful, Prisma will connect to Postgres, create the database, and all tables described in the `schema.prisma` file automatically.
- After these steps, you can run the project with the command `npm run start:dev`. The routes will be listed and available at `http://localhost:3000`
