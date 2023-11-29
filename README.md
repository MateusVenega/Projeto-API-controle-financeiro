
# API controle financeiro

### A ideia do projeto é a construção de uma RESTful API que contenha as seguintes funcionalidades:

- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 

### Para rodar a aplicação é necessário os seguintes programas instalados:

- nodeJS
- Postgres
- beekeeper studio
- Visual studio code
- expressJS
- insomnia

### Para instalar e rodar a aplicação basta fazer o fork do repositório no github utilizando o git clone + chave SSh/https após isso executar os seguites comandos:

```javascript
no terminal apos clonar o repositório na sua máquina execute os seguintes comandos:

- npm init -y
- npm install
- npm run dev 
```
### No insomnia criar as seguitnes rotas:
![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/5ae8eb47-f1b7-4212-bc07-3f574556e897)
- cadastrar usuário: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/285a0305-5d10-45b0-82ae-0542b08cf5ed)
- login usuário : ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/c49d7055-790e-4a8d-9939-25d52a38b618)
- atualizar usuário: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/8d92df7e-5562-4942-9b91-11669b05b08f)
- detalhar usuário: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/da8e2234-f378-4179-ad6d-083f2058ee24)
- listar transações : ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/2a6f2350-c2c8-4bba-bbc7-e158588b0225)
- listar categporias : ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/982cdcd7-1a2e-41bd-9dbe-00264c1f1a43)
- cadastrar transação: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/58000d7c-27bf-437e-b484-385e80821723)
- atualizar transação: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/c607d784-5041-45bb-b862-9c49791a284f)
- deletar transação: ![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/72e08bf1-2536-4661-b786-4a8ab92221b6)

## Banco de dados

O banco de dados criado a partir dos comandos contidos em dump.sql sera um Banco de Dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:  

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao
- transacoes
  - id
  - descricao
  - valor
  - data
  - categoria_id
  - usuario_id
  - tipo

**categorias:**
  
- Alimentação
- Assinaturas e Serviços
- Casa
- Mercado
- Cuidados Pessoais
- Educação
- Família
- Lazer
- Pets
- Presentes
- Roupas
- Saúde
- Transporte
- Salário
- Vendas
- Outras receitas
- Outras despesas

## Endpoints

### Cadastrar usuário
#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha
  ** A rota tambem deve validar os campos obrigatórios:
    - nome
    - email
    - senha
  - Validar se o e-mail informado já existe
  - Criptografar a senha antes de persistir no banco de dados
  - Cadastrar o usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```
```javascript
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```
### Login do usuário

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - email
  - senha

- **funcionalidades da rota: **

  - Validar os campos obrigatórios:
    - email
    - senha
  - Verificar se o e-mail existe
  - Validar e-mail e senha
  - Criar token de autenticação com id do usuário

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```
## ATENÇÃO: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, irão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado. Para inserir o token no insomnia basta ir na opção bearer e inserir o token fornecido ao usuário no momento do login.

![image](https://github.com/MateusVenega/Projeto-API-controle-financeiro/assets/129709846/1b84bf08-36a3-48ba-9f26-cfd95f19b154)

### Detalhar usuário

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta devolvera um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo:  

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```
### Atualizar usuário

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - email
  - senha

- **Resposta**  
    Em caso de **sucesso**, nada sera enviado como conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta devera entregar em seu corpo (body) um objeto com uma propriedade **mensagem** possuirá  como valor um texto explicando o motivo da falha.

- **funcionalidades do endpoint: **
  - Validar os campos obrigatórios:
    - nome
    - email
    - senha
  - Validar se o novo e-mail já existe no banco de dados para outro usuário
    - Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não sera permitida
  - Criptografar a senha antes de salvar no banco de dados
  - Atualizar as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### Listar categorias

#### `GET` `/categoria`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

- **Requisição** 
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.
  
- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um array dos objetos (categorias) encontrados.  
    Em caso de **falha na validação**, a resposta sera um  **_status code_** apropriado, e em seu corpo (body) sera enviado um objeto com uma propriedade **mensagem** que possuirá como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
[]
```
### Listar transações do usuário logado

#### `GET` `/transacao`

Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas, serão retornadas somente as transações associadas ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta possuirá um array dos objetos (transações) encontrados.  
    Em caso de **falha na validação**, a resposta sera um  **_status code_** apropriado, e em seu corpo (body) sera enviado um objeto com uma propriedade **mensagem** que possuirá como valor um texto explicando o motivo da falha.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```
### Detalhar uma transação do usuário logado

#### `GET` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas, onde sera retornada **apenas** a transação associada ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa a transação encontrada, com todas as suas propriedades
    Em caso de **falha na validação**, a resposta sera um  **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.
  
#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
    "mensagem": "Transação não encontrada."
}
```

### Cadastrar transação para o usuário logado

#### `POST` `/transacao`

Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.Deverá ser possível cadastrar apenas transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**
    Em caso de **sucesso**, deveremos enviar, no corpo (body) da resposta, as informações da transação cadastrada, incluindo seu respectivo `id`.  
    Em caso de **falha na validação**, a resposta sera um  **_status code_** apropriado, e em seu corpo (body) sera enviado um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **funcionalidades do endpoint:**
  - Validar os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no corpo (body) da requisição.
  - Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Cadastrar a transação associada ao usuário logado.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
### Atualizar transação do usuário logado

#### `PUT` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas. Deverá ser possível atualizar apenas transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades:

  - descricao
  - valor
  - data
  - categoria_id
  - tipo (campo que será informado se a transação corresponde a uma saída ou entrada de valores)

- **Resposta**  
    Em caso de **sucesso**, nada sera enviado como  conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta sera um **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **funcionalidades do endpoint:**
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Validar os campos obrigatórios:
    - descricao
    - valor
    - data
    - categoria_id
    - tipo
  - Validar se existe categoria para o id enviado no corpo (body) da requisição.
  - Validar se o tipo enviado no corpo (body) da requisição corresponde a palavra `entrada` ou `saida`, exatamente como descrito.
  - Atualizar a transação no banco de dados

#### **Exemplo de requisição**

```javascript
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
---
### Excluir transação do usuário logado

#### `DELETE` `/transacao/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas, onde sera possível excluir apenas transações associadas ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

- **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

- **Resposta**  
    Em caso de **sucesso**, nada sera enviado conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta sera um **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

- **funcionalidades do endpoint**:
  - Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
  - Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// Sem conteúdo no corpo (body) da resposta
```

```javascript
{
    "mensagem": "Transação não encontrada."
}
```
