/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Field,
  ObjectType,
  FieldResolver,
  Root,
} from 'type-graphql'
import { Converter } from 'showdown'
import { CourseInput, CourseUpdateInput } from '../Entity/course/course.input'
import { CourseModel, Course } from '../Entity/course/course.entity'
import { ClassRoom, ClassRoomModel } from '../Entity/classes/class.entity'

@ObjectType()
export class IdeleteResponse {
  @Field()
  n!: number

  @Field()
  ok!: number

  @Field()
  deletedCount!: number
}

@Resolver(() => Course)
class CourseResolver {
  @Query(() => [Course])
  async getCourses(): Promise<Course[]> {
    const courses = CourseModel.find()
    if (!courses) return []
    return courses
  }

  @FieldResolver()
  async classRoom(@Root() course: Course): Promise<ClassRoom> {
    return (await ClassRoomModel.findById(course.classRoom))!
  }

  // @FieldResolver()
  // async course(@Root() classRoom: ClassRoom): Promise<Course> {
  //   return (await CourseModel.findById(classRoom.course))!
  // }

  // @FieldResolver()
  // async members(@Root() classRoom: ClassRoom): Promise<User> {
  //   return (await UserModel.findById(classRoom.members))!
  // }

  @Query(() => Course, { nullable: false })
  async getOneCourse(@Arg('id') id: string): Promise<Course | null> {
    return CourseModel.findById({ _id: id })
  }

  @Mutation(() => Course)
  async createCourse(@Arg('data') data: CourseInput): Promise<Course> {
    const converter = new Converter()
    data.steps.forEach((step) => {
      step.contentHtml = converter.makeHtml(step.contentMd)
    })
    console.log(data.steps)
    const course = new CourseModel(data)
    console.log(course)
    try {
      await course.save()
    } catch (error) {
      console.log(error)
    }
    return course
  }

  @Mutation(() => Course)
  async updateCourse(
    @Arg('data') data: CourseUpdateInput
  ): Promise<Course | null> {
    const course = await CourseModel.findByIdAndUpdate(data._id, data, {
      new: true,
    })

    return course
  }

  @Mutation(() => IdeleteResponse)
  async deleteCourse(@Arg('id') id: string): Promise<IdeleteResponse> {
    const course = CourseModel.findById(id)
    const deletedCourse = await course.deleteOne()
    return deletedCourse
  }
}
export default CourseResolver
