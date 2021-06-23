/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DBTEST || 'mongodb://127.0.0.1:27017/lama-test'
    const connect = await mongoose.connect(uri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    console.log(colors.bgGreen.black('DBTEST connected'))
  } catch (error) {
    console.log(colors.red(error))
    process.exit(1)
  }
}
export default connectDB
