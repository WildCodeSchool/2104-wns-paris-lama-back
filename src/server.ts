import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

app.listen(8080, () => {
  console.log('Server start on Port 8080')
})
