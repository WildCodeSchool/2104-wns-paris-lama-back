/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { Mutation, Arg, Resolver, Query } from 'type-graphql'
import { CourseModel } from '../Entity/course/course.entity'
import { Comment, CommentModel } from '../Entity/comments/comment.entity'
import CommentInput, {
  CommentUpdateInput,
} from '../Entity/comments/comment.input'

@Resolver()
class CommentResolver {
  @Query(() => [Comment])
  async getComments(@Arg('course') course: string): Promise<Comment[]> {
    const comments = CommentModel.find({ course })
    if (!comments) return []
    return comments
  }

  @Query(() => Comment)
  async getOneComment(@Arg('_id') _id: string): Promise<Comment | null> {
    const comment = CommentModel.findById(_id)
    if (!comment) return null
    return comment
  }

  @Mutation(() => Comment)
  async createComment(
    @Arg('data') data: CommentInput
  ): Promise<Comment | null> {
    const course = await CourseModel.findById(data.course)
    if (!course) throw new Error('course not found')
    const comment = await (await CommentModel.create(data)).save()
    const { length } = await CommentModel.find({ course: data.course })
    course.localRate = (course.localRate || 0) + +comment.rate
    course.rating = course.localRate / (length || 1)
    course.save()
    console.log(course.rating, course.localRate, length, +comment.rate)
    return comment
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('data') data: CommentUpdateInput
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
