# Boas vindas ao repositório do Trybe Futebol Clube!

Este é um projeto backend desenvolvido enquanto durante meus estudos na Trybe.
**Todos os arquivos que estiverem como ultimo commit o Initial commit foram criados pela Trybe**, já os que tiverem outros commits foram criados ou modificados por mim.

# Iniciando o Projeto

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Caso necessário, acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) a versão atualmente instalada.

</details>

<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório

- Entre na pasta do repositório que você acabou de clonar:
  * `cd pasta-do-repositório`

  2. Instale as dependências
  *`npm run install:apps`

  3. Suba o container
  *`npm run compose:up`
</details>

# Endpoints simples

*Para executar os testes unitários dos endpoints faça isso:*
  - Entre na pasta app/backend
  - Execute o comando no seu terminal `npm run test`

### /teams

- Fazendo um GET no `localhost:3001/teams` O Resultado esperado é a lista com todos os times do banco de dados.

- Fazendo um GET no `localhost:3001/teams/:id` O Resultado esperado é a lista com o time do ID especificado

### /login

- Entre no `localhost:3000/login` no login coloque admin@admin.com e na senha coloque secret admin. Você consiguirá entrar no site.


### /matches

- Fazendo um GET no `localhost:3001/matches` O Resultado esperado é a lista com todas as partidas do banco de dados.

- Fazendo um GET no `localhost:3001/matches/:id` O Resultado esperado é a lista com o time do ID especificado


### /leaderboard/home

- Fazendo um GET no `localhost:3001/leaderboard/home` O Resultado esperado é uma placar com pontos, gols, vitorias, empates e derrotas.