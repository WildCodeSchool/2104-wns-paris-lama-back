/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int, ID, Float } from 'type-graphql'
import {
  Prop,
  getModelForClass,
  Index,
  Severity,
  setGlobalOptions,
} from '@typegoose/typegoose'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

@ObjectType()
export class Link {
  @Field()
  @Prop({ trim: true, required: true })
  title!: string

  @Field()
  @Prop({ required: true })
  url!: string
}

@ObjectType()
export class Comment {
  @Field()
  @Prop({ trim: true, required: true })
  name!: string

  @Field()
  @Prop({ required: true })
  content!: string

  @Field(() => Float)
  @Prop({ required: true })
  rate!: number
}

@ObjectType()
export class Course {
  @Field(() => ID)
  id!: string

  @Field()
  @Prop({ trim: true, required: true })
  title!: string

  @Field()
  @Prop({ required: true })
  categories!: string

  @Field()
  @Prop({ required: true })
  video!: string

  @Field(() => [Link])
  @Prop({ required: false })
  link?: Array<Link>

  @Field(() => [Comment])
  @Prop({ required: false })
  comment?: Array<Comment>

  @Field(() => Int)
  @Prop({ required: false, default: 0 })
  rating?: number

  @Field(() => Date)
  createdAt?: Date

  @Field(() => Date)
  updatedAt?: Date
}

export const CourseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
})
