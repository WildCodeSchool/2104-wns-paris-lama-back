/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line max-classes-per-file
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { UserModel, User } from '../Entity/user/user.entity'
import { IContext, isAuth } from '../middlewares/auth.middleware'
import { createAccessToken, createRevreshToken } from '../utils/auth'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string
}
@ObjectType()
class RigesterResponse {
  @Field()
  accessToken!: string

  @Field()
  Ok!: boolean

  @Field()
  message!: string
}
@ObjectType()
class ILAMA_Response {
  @Field()
  ok!: boolean

  @Field()
  message!: string

  @Field()
  user!: User
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getUser(@Ctx() { payload }: IContext): Promise<User | null> {
    const id = payload!.userId
    const user = await UserModel.findById(id)
    return user
  }

  @Mutation(() => RigesterResponse)
  async Register(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: IContext
  ): Promise<RigesterResponse> {
    const hashedPassword = await hash(password, 13)
    const isUser = await UserModel.findOne({ email })
    if (isUser) {
      throw new Error('email exist')
    }
    try {
      const user = await new UserModel({
        name,
        email,
        password: hashedPassword,
      })
      user.save()
      ctx.res.cookie('jid', createRevreshToken(user), {
        httpOnly: true,
      })

      return {
        accessToken: createAccessToken(user),
        Ok: true,
        message: 'seccessfully created',
      }
    } catch (err: any) {
      console.log(err)
      return {
        accessToken: '',
        Ok: false,
        message: err.message,
      }
    }
  }

  @Mutation(() => ILAMA_Response)
  @UseMiddleware(isAuth)
  async UpdateUser(
    @Ctx() { payload }: IContext,
    @Arg('name') name?: string,
    @Arg('email') email?: string
  ): Promise<ILAMA_Response> {
    if (!payload) {
      throw new Error('Not authenticated')
    }
    const id = payload.userId
    try {
      const user = await UserModel.findById(id)
      if (!user) throw new Error('user NotFound')
      user.name = name || user.name
      if (email) {
        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) {
          throw new Error('Email is exist')
        }
        user.email = email
      }
      await user.save()
      return { ok: true, message: 'update seccessfully', user }
    } catch (err: any) {
      console.log(err)
      return { ok: false, message: err.message, user: {} as User }
    }
  }

  @Mutation(() => LoginResponse)
  async Login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: IContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email })
    if (!user) {
      throw new Error('Could not find user')
    }

    const verify = await compare(password, user.password)

    if (!verify) {
      throw new Error('Bad password')
    }
    res.cookie('jid', createRevreshToken(user), {
      httpOnly: true,
    })

    return {
      accessToken: createAccessToken(user),
    }
  }
}
