/* eslint-disable max-classes-per-file */
import { InputType, Field, ID } from 'type-graphql'
import { Course, Link } from './course.entity'

@InputType()
class LinkInput implements Partial<Link> {
  @Field()
  title!: string

  @Field()
  url!: string

  @Field()
  img!: string
}

@InputType()
class CourseInput implements Partial<Course> {
  @Field()
  title!: string

  @Field()
  categories!: string

  @Field()
  video!: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]
}

@InputType()
export class CourseUpdateInput implements Partial<Course> {
  @Field(() => ID)
  id!: string

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
}

export default CourseInput
