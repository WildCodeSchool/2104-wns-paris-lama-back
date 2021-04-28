/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import CourseInput, {
  CommentInput,
  CourseUpdateInput,
} from '../Entity/course/course.input'
import { CourseModel, Course, Comment } from '../Entity/course/course.entity'

@Resolver()
class CourseResolver {
  @Query(() => [Course])
  async getCorses(): Promise<Course[]> {
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
    const course = await CourseModel.findById(data.id)

    if (data.comment && data.comment[0] && data.comment[0].rate) {
      if (course && course.comment) {
        course.comment.push(data.comment[0])

        await course.save()
        delete data.comment

        course.updateOne(data)
        const rating = course.comment.reduce(
          // eslint-disable-next-line radix
          (pre, cur) => pre + +cur.rate,
          0
        )
        course.rating = rating / course.comment.length
      }
    }
    return course
  }

  // @Mutation(() => Comment)
  // async addComment(@Arg('data') data: CommentInput): Promise<Comment | null> {
  //   const course = await CourseModel.findByIdAndUpdate(data.id, data, {
  //     new: true,
  //   })
  //   if (data.comment && data.comment[0] && data.comment[0].rate) {
  //     if (course) {
  //       console.log(data.comment[0].rate)
  //       const s = +data.comment[0].rate
  //       console.log(s)
  //       const rating = data.comment.reduce(
  //         // eslint-disable-next-line radix
  //         (pre, cur) => pre + +cur.rate,
  //         0
  //       )
  //       course.rating = rating
  //     }
  //   }
  //   return course
  // }

  @Mutation(() => Boolean)
  async deleteCourse(@Arg('id') id: string): Promise<boolean> {
    await CourseModel.deleteOne({ id })
    return true
  }
}
export default CourseResolver
