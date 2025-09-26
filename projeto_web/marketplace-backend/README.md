# Marketplace Backend – AV2 DSW

Backend completo em Node.js + Express + Prisma + MySQL para simular um marketplace enxuto.

## 🚀 Como executar

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Crie um arquivo `.env` baseado no `.env.example` com sua URL do banco.

## 📦 Estrutura

```
prisma/
  schema.prisma
src/
  db.js
  index.js
  routes/
    users.js
    stores.js
    products.js
.env.example
package.json
nodemon.json
README.md
```

## 🛠️ Endpoints principais

### Users

- `POST /users` – Criar usuário
- `GET /users` – Listar usuários
- `GET /users/:id` – Buscar usuário
- `PUT /users/:id` – Atualizar usuário
- `DELETE /users/:id` – Remover usuário

### Stores

- `POST /stores` – Criar loja
- `GET /stores` – Listar lojas
- `GET /stores/:id` – Buscar loja (inclui dono e produtos)
- `PUT /stores/:id` – Atualizar loja
- `DELETE /stores/:id` – Remover loja

### Products

- `POST /products` – Criar produto
- `GET /products` – Listar produtos (inclui loja e dono)
- `GET /products/:id` – Buscar produto
- `PUT /products/:id` – Atualizar produto
- `DELETE /products/:id` – Remover produto

## 🧪 Exemplos de requisições (Insomnia/Postman)

### Criar usuário

```json
POST /users
{
  "name": "Lucas",
  "email": "lucas@email.com"
}
```

### Criar loja

```json
POST /stores
{
  "name": "Loja do Lucas",
  "userId": 1
}
```

### Criar produto

```json
POST /products
{
  "name": "Produto X",
  "price": 99.99,
  "storeId": 1
}
```

### Buscar loja com dono e produtos

```
GET /stores/1
```

### Buscar produtos com loja e dono

```
GET /products
```

---