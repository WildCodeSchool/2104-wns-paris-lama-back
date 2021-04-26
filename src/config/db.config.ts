/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose
      .connect('mongodb://localhost:27017/lama', {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      })
      .catch((e) => console.log(e))
    console.log(colors.bgGreen.black('DB connected'))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB
