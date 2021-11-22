import { Request } from 'express'
import { AuthCredental } from './credentals.model'

export interface IRequest extends Request {
     user: AuthCredental
}
