import express, { Request, Response } from 'express'
import cors from 'cors'
import colors from 'colors'
import connectDB from './config/db.config'

connectDB()
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

app.listen(8080, () => {
  console.log(colors.bgWhite.black('Server start on Port 8080'))
})
