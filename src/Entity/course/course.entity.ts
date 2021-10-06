/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int, ID, Float } from 'type-graphql'
import {
  prop,
  getModelForClass,
<<<<<<< HEAD
  Severity,
  setGlobalOptions,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ClassRoom } from '../classes/class.entity'
import { RefType } from '../../types'
=======
  Index,
  Severity,
  setGlobalOptions,
  Ref,
} from '@typegoose/typegoose'
import { Comment } from '../comments/comment.entity'
>>>>>>> origin/main

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

@ObjectType()
export class Link {
  @Field()
  @prop({ trim: true, required: true })
  title!: string

  @Field()
  @prop({ required: true })
  url!: string
}

@ObjectType()
export class Course {
  @Field(() => ID)
<<<<<<< HEAD
  readonly _id!: ObjectId
=======
  id!: string
>>>>>>> origin/main

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

  @Field()
  @prop({ required: true })
  img!: string

  @Field(() => ClassRoom)
  @prop({ required: true, ref: ClassRoom })
  classRoom!: RefType<ClassRoom>

  @Field(() => Date)
  createdAt?: Date

  @Field(() => Date)
  updatedAt?: Date
}

export const CourseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
})
