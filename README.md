# MoneyMinder Backend

For more info, see [front-end repo](https://github.com/meganveldhuis/moneyminder-client)

### Set-Up

#### Back-end server:

- clone repo
- download MySQL and create a database
- add credentials to .env
- run `npm i` to install dependencies
- run `npm run migrate` to create tables within database
- run `npm run seed` to add sample data to database
- run `npm run dev` to start the server

### Endpoints

1. Expenses Routes (`http:localhost:8080/api/expense`)

- `get` all expense records
- `get` summary of all expenses by category (`/api/expense/category`)
- `get` an expense by id
- `post` new expense record
- `patch` edit expense record
- `delete` expense record

2. Income Routes (`http:localhost:8080/api/income`)

- `get` all income records
- `get` income by id
- `get` summary of all income by category (`/api/income/category`)
- `post` new income record
- `patch` edit income record
- `delete` income record

3. Categories Routes (`http:localhost:8080/api/categories`)

- `get` all Expense categories (`/api/categories/expense`)
- `get` all Income categories (`/api/categories/income`)
- `get` category by id (`/api/categories/:id`)
<!-- - `post` new category
- `delete` category -->

4. Budget Routes (`http:localhost:8080/api/budget`)

- `get` all budget lines
- `put` new budget line and new category (`http:localhost:8080/api/budget/category`)
- `get` a budget by category id
<!-- - `patch` edit budget line
- `delete` budget line -->

5. Currency Routes (`http:localhost:8080/api/currency`)

- `get` all currency codes

6. Date Routes (`http:localhost:8080/api/date`)

- `get` all years that exist in the income and expense records

7. Trips Routes (`http:localhost:8080/api/trips`)

- `get` all trips
- `get` trip by id

8. Photo Routes (`http:localhost:8080/api/photo`)

- `get` a photo based on a searchTerm (using Unsplash API)
