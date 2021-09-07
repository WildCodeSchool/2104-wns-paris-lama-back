/* eslint-disable import/prefer-default-export */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { User } from './user.entity'

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field(() => String)
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}
