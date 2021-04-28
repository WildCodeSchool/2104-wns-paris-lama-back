/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import CourseInput, { CourseUpdateInput } from '../Entity/course/course.input'
import { CourseModel, Course } from '../Entity/course/course.entity'

@Resolver()
class CourseResolver {
  @Query(() => [Course])
  async getCourses(): Promise<Course[]> {
    return CourseModel.find()
  }

  @Query(() => Course, { nullable: false })
  async getOneCourse(@Arg('id') id: string): Promise<Course | null> {
    return CourseModel.findById({ _id: id })
  }

  @Mutation(() => Course)
  async createCourse(@Arg('data') data: CourseInput): Promise<Course> {
    const course = (await CourseModel.create(data)).save()
    return course
  }

  @Mutation(() => Course)
  async updateCourse(
    @Arg('data') data: CourseUpdateInput
  ): Promise<Course | null> {
    const course = await CourseModel.findByIdAndUpdate(data.id, data, {
      new: true,
    })

    return course
  }

  @Mutation(() => Boolean)
  async deleteCourse(@Arg('id') id: string): Promise<boolean> {
    await CourseModel.deleteOne({ id })
    return true
  }
}
export default CourseResolver
