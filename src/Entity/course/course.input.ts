/* eslint-disable max-classes-per-file */
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

  @Field({ nullable: false })
  description?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]
}

@InputType()
export class CourseUpdateInput implements Partial<Course> {
  @Field(() => ID)
  id!: string

  @Field({ nullable: false })
  title?: string

  @Field({ nullable: false })
  categories?: string

  @Field({ nullable: false })
  description?: string

  @Field({ nullable: false })
  video?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]
}

export default CourseInput
