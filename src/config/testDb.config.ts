/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import colors from 'colors'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

export const connectDBTEST = async (): Promise<void> => {
  try {
    const uri = await mongod.getUri()

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }

    await mongoose.connect(uri, mongooseOpts)
    console.log(colors.bgGreen.black('DBTEST connected'))
  } catch (error) {
    console.log(colors.red(error))
    process.exit(1)
  }
}
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}
