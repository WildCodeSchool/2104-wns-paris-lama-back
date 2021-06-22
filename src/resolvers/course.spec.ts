import { gql } from 'apollo-server-core'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { startserver } from '../server'

const { createTestClient } = require('apollo-server-testing')

const GET_ONE_COURSE_BY_ID = gql`
  query getOneCourse($id: String!) {
    getOneCourse(id: $id) {
      id
      title
      categories
      video
      link {
        title
        url
      }
      rating
    }
  }
`
const ADD_NEW_COURSE = gql`
  mutation createCourse($data: CourseInput!) {
    createCourse(data: $data) {
      title
      video
      categories
      description
      link {
        title
        url
      }
    }
  }
`
const GET_ALL_COURSES = gql`
  {
    getCourses {
      id
      title
      categories
      description
      createdAt
    }
  }
`
// let config: any

describe('course Resolver test suits', () => {
  let apollo: ApolloServer | null = null
  //   let mongo: MongoMemoryServer = new MongoMemoryServer()

  beforeAll(async () => {
    /// // uncomment lines below if you want an inmemory version
    // mongo = new MongoMemoryServer()
    // config.uri = await mongo.getUri()

    apollo = await startserver('TEST')
  })

  afterAll(async () => {
    if (apollo !== null) await apollo.stop()

    // await mongo.stop()
    await mongoose.disconnect()
  })

  it('test', async () => {
    const { query } = createTestClient(apollo)
    const res = await query({ query: GET_ALL_COURSES })
    console.log(res)
    expect(res.data).toBeDefined()
  })
  it('test create course', async () => {
    const { mutate } = createTestClient(apollo)
    const res = await mutate({
      mutation: ADD_NEW_COURSE,
      variables: {
        data: {
          title: 'dsf',
          categories: 'dsfqd',
          video: 'dfq',
          description: 'sfdf',
          link: { title: 'sdqf', url: 'dfqdfq', img: 'qsdf' },
        },
      },
    })
    expect(res.data).toHaveProperty('createCourse')
    expect(res.data.createCourse).toHaveProperty('title')
    expect(res.data.createCourse).toEqual({
      title: 'dsf',
      categories: 'dsfqd',
      video: 'dfq',
      description: 'sfdf',
      link: [{ title: 'sdqf', url: 'dfqdfq' }],
    })
  })
})
