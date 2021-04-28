/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Mutation, Arg, Resolver, Query } from 'type-graphql'
import { Course, CourseModel } from '../Entity/course/course.entity'
import { Comment, CommentModel } from '../Entity/comments/comment.entity'
import CommentInput from '../Entity/comments/comment.input'

@Resolver()
class CommentResolver {
  @Query(() => [Comment])
  async getComments(@Arg('course') course: string): Promise<Comment[]> {
    return CommentModel.find({ course })
  }

  @Query(() => Comment)
  async getOneComment(@Arg('_id') _id: string): Promise<Comment | null> {
    return CommentModel.findById(_id)
  }

  @Mutation(() => Course)
  async createComment(@Arg('data') data: CommentInput): Promise<Course | null> {
    const course = await CourseModel.findById(data.course)
    if (!course) throw new Error('course not found')
    const comment = await (await CommentModel.create(data)).save()
    if (course.comments) course.comments.push(comment)
    return course
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('data') data: CommentInput
  ): Promise<Comment | null> {
    const updatedComment = await CommentModel.findByIdAndUpdate(data.id, data, {
      new: true,
    })
    return updatedComment
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg('id') id: string): Promise<boolean> {
    await CommentModel.deleteOne({ id })
    return true
  }
}

export default CommentResolver
