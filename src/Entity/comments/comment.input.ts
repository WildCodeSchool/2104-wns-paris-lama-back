/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { Comment } from './comment.entity'

@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  name!: string

  @Field()
  content!: string

  @Field()
  rate!: string

  @Field(() => String, { nullable: true })
  course!: ObjectId
}

@InputType()
export class CommentUpdateInput implements Partial<Comment> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  name!: string

  @Field()
  content!: string

  @Field()
  rate!: string

  @Field(() => String, { nullable: true })
  course!: ObjectId
}

export default CommentInput
