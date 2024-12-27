import express, { Request, Response } from 'express'
import cors from 'cors'
import { companyRouter } from './routes/company.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:5173', // Разрешите запросы с клиента
}))

app.use(express.json())
app.use('/api', companyRouter)


app.listen(PORT, () => {
  console.log(`Start server ${PORT}`)
})