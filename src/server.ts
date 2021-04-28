import express from 'express'
import cors from 'cors'
import colors from 'colors'
import { config } from 'dotenv'
import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'

import connectDB from './config/db.config'

import CourseResolver from './resolvers/course.resolver'
// eslint-disable-next-line prettier/prettier
const startserver = async () => {
  config()
  connectDB()
  const schema = await buildSchema({
    resolvers: [CourseResolver],
    emitSchemaFile: true,
    validate: false,
  })

  const server = new ApolloServer({ schema })
  await server.start()

  const app = express()
  app.use(cors())

  server.applyMiddleware({ app })

  app.listen({ port: 8080 })
  console.log(
    colors.bgBlack.white(
      `Server ready 🦙🦙🦙  at http://localhost:8080${server.graphqlPath}`
    )
  )
  return { server, app }
}
startserver()
