/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { ObjectId } from 'mongoose'
import CourseInput, { CourseUpdateInput } from '../Entity/course/course.input'
import { CourseModel, Course } from '../Entity/course/course.entity'

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
<<<<<<< HEAD
    const _id = new ObjectID(id)
=======
    const _id = new ObjectId(id)
>>>>>>> 91db8a93c114d68ea428d386597a080a1af7899d
    const deletedCourse = await CourseModel.deleteOne({ _id })
    console.log(deletedCourse)
    return true
  }
}
export default CourseResolver
