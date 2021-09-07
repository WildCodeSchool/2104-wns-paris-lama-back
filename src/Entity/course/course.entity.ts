/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int, ID, Float } from 'type-graphql'
import {
  prop,
  getModelForClass,
  Severity,
  setGlobalOptions,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

@ObjectType()
export class Link {
  @Field()
  @prop({ trim: true, required: true })
  title!: string

  @Field()
  @prop({ required: true })
  url!: string

  @Field()
  @prop({ required: true })
  img!: string
}

@ObjectType()
export class Course {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @prop({ trim: true, required: true })
  title!: string

  @Field()
  @prop({ required: true })
  categories!: string

  @Field()
  @prop({ required: false })
  description?: string

  @Field()
  @prop({ required: true })
  video!: string

  @Field(() => [Link])
  @prop({ required: false })
  link?: Array<Link>

  @Field(() => Float)
  @prop({ required: false, default: 0 })
  rating?: number

  @Field(() => Float)
  @prop({ required: false, default: 0 })
  localRate?: number

  @Field(() => Date)
  createdAt?: Date

  @Field(() => Date)
  updatedAt?: Date
}

export const CourseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
})
