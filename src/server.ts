/* eslint-disable import/prefer-default-export */
import express from 'express'
import cors from 'cors'
import colors from 'colors'
import { config } from 'dotenv'
import { buildSchema } from 'type-graphql'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'

import connectDB from './config/db.config'
import { connectDBTEST } from './config/testDb.config'

import CourseResolver from './resolvers/course.resolver'
import CommentResolver from './resolvers/comment.resolver'
// eslint-disable-next-line prettier/prettier
export const startserver = async (
  env: 'TEST' | 'DEV'
): Promise<ApolloServer> => {
  config()
  if (env === 'DEV' || env !== 'TEST') connectDB()
  if (env === 'TEST') connectDBTEST()
  const schema = await buildSchema({
    resolvers: [CourseResolver, CommentResolver],
    emitSchemaFile: true,
    validate: false,
  })

  const server = new ApolloServer({ schema })
  await server.start()

  const app = express()
  app.use(cors())

  server.applyMiddleware({ app })

  app.listen({ port: 8080 })
  if (env === 'DEV') {
    console.log(
      colors.bgBlack.white(
        `Server ready 🦙🦙🦙 at http://localhost:8080${server.graphqlPath}`
      )
    )
  }
  return server
}
