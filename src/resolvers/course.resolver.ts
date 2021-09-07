/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation, Field, ObjectType } from 'type-graphql'
import CourseInput, { CourseUpdateInput } from '../Entity/course/course.input'
import { CourseModel, Course } from '../Entity/course/course.entity'

@ObjectType()
export class IdeleteResponse {
  @Field()
  n!: number

  @Field()
  ok!: number

  @Field()
  deletedCount!: number
}

@Resolver()
class CourseResolver {
  @Query(() => [Course])
  async getCourses(): Promise<Course[]> {
    const courses = CourseModel.find()
    if (!courses) return []
    return courses
  }

  @Query(() => Course, { nullable: false })
  async getOneCourse(@Arg('id') id: string): Promise<Course | null> {
    return CourseModel.findById({ _id: id })
  }

  @Mutation(() => Course)
  async createCourse(@Arg('data') data: CourseInput): Promise<Course> {
    const course = new CourseModel(data)
    await course.save()
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
