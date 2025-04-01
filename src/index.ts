import mysql, { ResultSetHeader, RowDataPacket } from "mysql2"
import dotenv from "dotenv"
import express, { Request, Response } from "express"
const app = express()

dotenv.config()

app.use(express.json())

// ⭐️ connect MySQL
const db = mysql.createConnection({
    host: String(process.env.MYSQL_HOST),
    user: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    port: Number(process.env.MYSQL_PORT),
    database: String(process.env.MYSQL_DATABASE),
})

// ⭐️ get all product
app.get('/products', (req: Request, res: Response) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to get product:", error: err.message })
        } else {
            res.status(200).json({ message: result })
        }
    })
})

// ⭐️ create new product
app.post('/products', (req: Request, res: Response) => {
    const { name, price, discount, review_count, image_url } = req.body
    db.query<ResultSetHeader>("INSERT INTO products (name,price,discount,review_count,image_url) VALUE(?,?,?,?,?)", [name, price, discount, review_count, image_url], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to create new product:", error: err.message })
        } else {
            res.status(201).json({
                message: "create new product successfully",
                product: {
                    id: result.insertId,
                    name: name,
                    price: price,
                    discount: discount,
                    review_count: review_count,
                    image_url: image_url
                }
            })
        }
    })
})

// ⭐️ delete product
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    db.query<ResultSetHeader>("DELETE FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to delete product:", error: err.message })
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ message: "product not found" })
            } else {
                res.status(200).json({ message: "delete product successfully" })
            }
        }
    })
})

// ⭐️ update product
app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const { name, price, discount, review_count, image_url } = req.body
    db.query<ResultSetHeader>("UPDATE products SET name = ?,price = ?, discount = ?, review_count=?, image_url=? WHERE id = ?", [name, price, discount, review_count, image_url, id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to update product:", error: err.message })
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: "update product successfully",
                    product: {
                        id: id,
                        name: name,
                        price: price,
                        discount: discount,
                        review_count: review_count,
                        image_url: image_url,
                    }
                })
            } else {
                res.status(404).json({ message: "product not found" })
            }
        }
    })
})

// ⭐️ get product by id
app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    db.query<RowDataPacket[]>("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ message: "error to update product:", error: err.message })
        } else {
            if (result.length === 0) {
                res.status(404).json({ message: "product not found" })
            } else {
                res.status(200).json({ message: result })
            }
        }
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send('hello world')
})

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
})