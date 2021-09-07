/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Mutation,
  Arg,
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql'
import CryptoJS from 'crypto-js'
import { ObjectId } from 'mongodb'
import { Ref } from '@typegoose/typegoose'
import { ClassRoom, ClassRoomModel } from '../Entity/classes/class.entity'
import ClassInput, { ClassRoomUpdateInput } from '../Entity/classes/class.input'
import { IContext, isAuth } from '../middlewares/auth.middleware'
import { User, UserModel } from '../Entity/user/user.entity'
import { IdeleteResponse } from './course.resolver'

@Resolver(() => ClassRoom)
class ClassRoomResolver {
  @Query(() => [ClassRoom])
  @UseMiddleware(isAuth)
  async getMyClasses(@Ctx() ctx: IContext): Promise<ClassRoom[]> {
    const classRooms = ClassRoomModel.find({
      owner: ctx.payload!.userId,
    })
    if (!classRooms) return []
    return classRooms
  }

  @Query(() => [ClassRoom])
  @UseMiddleware(isAuth)
  async getPublicClasses(): Promise<ClassRoom[]> {
    const classRooms = ClassRoomModel.find({
      state: 'PUBLIC',
    })
    if (!classRooms) return []
    return classRooms
  }

  @Query(() => ClassRoom)
  @UseMiddleware(isAuth)
  async getOneClassRoom(
    @Ctx() ctx: IContext,
    @Arg('id') id: string
  ): Promise<ClassRoom> {
    const { userId } = ctx.payload!
    const classRoom = await ClassRoomModel.findById(id)
    if (!classRoom) throw new Error('Not Valid id')
    if(
      (classRoom.state === 'PRIVATE' && 
      classRoom.members!.filter((m) => m == userId as unknown as Ref<User>).length === 0) &&
      classRoom.owner as unknown as string != userId) {throw new Error('Promision denied')}

    return classRoom
  }

  @Mutation(() => ClassRoom)
  @UseMiddleware(isAuth)
  async createClass(
    @Ctx() ctx: IContext,
    @Arg('data') data: ClassInput
  ): Promise<ClassRoom> {
    const { userId } = ctx.payload!
    const classRoom = await new ClassRoomModel({ ...data, owner : userId })
    classRoom.inviteSecret = CryptoJS.MD5(classRoom._id).toString()
    await classRoom.save()
    return classRoom
  }

  @FieldResolver()
  async owner(@Root() classRoom: ClassRoom): Promise<User> {
    return (await UserModel.findById(classRoom.owner))!;
  }

  @Mutation(() => ClassRoom)
  async updateClass(
    @Arg('data') data: ClassRoomUpdateInput
  ): Promise<ClassRoom | null> {
    const updatedClassRoom= await ClassRoomModel.findByIdAndUpdate(data._id, data, {
      new: true,
    })
    return updatedClassRoom
  }

  @Mutation(() => IdeleteResponse)
  async deleteClass(@Arg('id') id: string): Promise<IdeleteResponse> {
    await ClassRoomModel.deleteOne({ id })
    const classRoom = ClassRoomModel.findById(id)
    const deletedClass = await classRoom.deleteOne()
    return deletedClass
  }
}

export default ClassRoomResolver
