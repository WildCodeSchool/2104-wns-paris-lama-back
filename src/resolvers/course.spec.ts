import { gql } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { startserver } from '../server'
import { closeDatabase } from '../config/testDb.config'

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

  beforeAll(async () => {
    apollo = await startserver('TEST')
  })

  afterAll(async () => {
    if (apollo !== null) await apollo.stop()
    await closeDatabase()
  })

  it('test', async () => {
    const { query } = createTestClient(apollo)
    const res = await query({ query: GET_ALL_COURSES })
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
