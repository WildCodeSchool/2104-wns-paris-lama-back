/* eslint-disable import/prefer-default-export */
import { InputType, Field } from 'type-graphql'
import { User } from './user.entity'

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => String)
  name!: string

  @Field()
  lastName!: string

  @Field()
  email!: string

  @Field()
  password!: string
}
