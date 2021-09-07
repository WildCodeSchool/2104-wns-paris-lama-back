/* eslint-disable import/no-cycle */
import {
  getModelForClass,
  prop,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { Course } from '../course/course.entity'
import { User } from '../user/user.entity'
import { Ref } from '../../types'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class ClassRoom {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @prop({ trim: true, required: true })
  name!: string

  @Field()
  @prop({ trim: true, required: false })
  inviteSecret?: string

  @Field(() => User)
  @prop({ required: false, ref: User })
  owner!: Ref<User>

  @Field()
  @prop({ required: false, default: 0 })
  rate?: number

  @Field()
  @prop({ required: true, default: 'PUBLIC' })
  state?: 'PUBLIC' | 'PRIVATE'

  @Field(() => [Course])
  @prop({ required: false })
  public course?: Array<Ref<Course>>

  @Field(() => [User])
  @prop({ required: false, ref: User })
  public members?: Ref<User>[]

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const ClassRoomModel = getModelForClass(ClassRoom, {
  schemaOptions: { timestamps: true },
})
