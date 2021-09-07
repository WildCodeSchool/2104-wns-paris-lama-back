/* eslint-disable import/no-cycle */
import {
  getModelForClass,
  prop,
  Ref,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'
import { Course } from '../course/course.entity'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Comment {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @prop({ trim: true, required: true })
  name!: string

  @Field()
  @prop({ required: true })
  content!: string

  @Field()
  @prop({ required: true })
  rate!: string

  @Field(() => String)
  @prop({ required: true })
  public course!: Ref<Course>
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
})
