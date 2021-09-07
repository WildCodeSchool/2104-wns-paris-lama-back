/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/prefer-default-export */
import { MiddlewareFn } from 'type-graphql'
import { verify } from 'jsonwebtoken'
import { Response, Request } from 'express'

// format like bearer 21321n2bmbbj
export interface IContext {
  req: Request
  res: Response
  payload?: { userId: string }
}
export const isAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  const { authorization } = context.req.headers

  if (!authorization) {
    throw new Error('Not authenticated')
  }

  try {
    const token = authorization.split(' ')[1]
    const payload = verify(token, process.env.ACCESS_TOKEN!)
    context.payload = payload as any
  } catch (err) {
    console.log(err)
    throw new Error('Not authenticated')
  }
  return next()
}
