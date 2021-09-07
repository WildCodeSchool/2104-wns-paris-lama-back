/* eslint-disable @typescript-eslint/no-explicit-any */
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
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }

    await mongoose.connect(uri, mongooseOpts)
  } catch (error: any) {
    console.log(colors.red(error))
    process.exit(1)
  }
}
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}
export const clearDatabase = async (): Promise<void> => {
  const { collections } = mongoose.connection
  Object.values(collections).forEach(async (collection: any) => {
    await collection.deleteMany({})
  })
}
