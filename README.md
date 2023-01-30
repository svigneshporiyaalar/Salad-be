#Salad - Wellness for women

```
npm run dev
```
Create Modal

```
yarn db:modal:create --name User --attributes name:string,email:string
```

Create Migration

```
yarn db:migration:create --name modify_users_add_new_fields
```

Create Seed

```
yarn db:migration:seed --name User
```

Run All Seeds

```
npx sequelize-cli db:seed:all
```
Revert seed
```
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:undo --seed name of seed data
```
```
yarn db:seed
```

Run Migration

```
yarn db:migrate
```

Check scripts for more commands

check docs for collection
