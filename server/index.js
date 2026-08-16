import express from 'express'
import cors from 'cors'
import { Pool } from 'pg'

const app = express()
app.use(express.json())
app.use(cors())

const pool = new Pool({
    database: 'redux_user',
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    port: 5432
})


app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users ORDER BY id")

        res.json(rows)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

console.log('ФУНКЦИЯ ЛОГИНА')

app.post('/users', async (req, res) => {
    try {
        const { username, email } = req.body

        if (!username || !email) {
            return res.status(400).json({ error: 'Введите корректные данные' })
        }

        const { rows } = await pool.query("INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *", [username.trim(), email.trim()])


        res.json(rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const { username, email, is_active } = req.body

        const id = Number(req.params.id)

        if (is_active === undefined) {

            if (!username || !email) {
                return res.status(400).json({ error: 'Введите корректные данные' })
            }

            const { rows } = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *", [username, email, id])

            if (!rows.length) {
                return rows.status(404).json({ error: 'Такого пользователя не существует' })
            }
            res.json(rows[0])

        } else {
            const { rows } = await pool.query("UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *", [is_active, id])

            if (!rows.length) {
                return rows.status(404).json({ error: 'Такого пользователя не существует' })
            }

            res.json(rows[0])

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const { rows } = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])

        if (!rows.length) {
            return rows.status(404).json({ error: 'Такого пользователя не существует' })
        }
        res.json(rows[0])

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Ошибка сервера" })
    }
})

app.listen(3000, () => {
    console.log('Сервер запущен')
})
