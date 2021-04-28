/* eslint-disable max-classes-per-file */
import { InputType, Field, ID, Float } from 'type-graphql'
import { Comment, Course, Link } from './course.entity'

@InputType()
class LinkInput implements Partial<Link> {
  @Field()
  title!: string

  @Field()
  url!: string
}

@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  name!: string

  @Field()
  content!: string

  @Field()
  rate!: string
}

@InputType()
class CourseInput implements Partial<Course> {
  @Field()
  title!: string

  @Field()
  categories!: string

  @Field()
  video!: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]

  @Field(() => [CommentInput], { nullable: true })
  comment?: CommentInput[]
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
  video?: string

  @Field(() => [LinkInput], { nullable: true })
  link?: LinkInput[]

  @Field(() => [CommentInput], { nullable: true })
  comment?: CommentInput[]
}

export default CourseInput
