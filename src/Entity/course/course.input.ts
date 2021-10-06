/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { Course, Link } from './course.entity'

@InputType()
class LinkInput implements Partial<Link> {
  @Field()
  title!: string

  @Field()
  url!: string
}

@InputType()
class CourseInput implements Partial<Course> {
  @Field()
  title!: string

  @Field()
  categories!: string

  @Field()
  video!: string

  @Field()
  img!: string

  @Field(() => String, { nullable: false })
  classRoom!: ObjectId

  @Field({ nullable: true })
  description?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]
}

@InputType()
export class CourseUpdateInput implements Partial<Course> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  categories?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  video?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]

  @Field()
  img?: string
}

export default CourseInput
