import { MessageType } from '@models/Response.model';
import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import GeneratedResponse from 'src/shared/ResponseSchema';
import dotenv from 'dotenv';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { IRequest } from '@models/IRequest.model';
import sql from 'src/database/config';

dotenv.config();
const authorizeToken = async (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.cookies['Authorization'];
  const unauthorizeResponse = () =>
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(GeneratedResponse(null, 'Unauthorize', MessageType.ERROR));

  if (token === undefined) {
    return unauthorizeResponse();
  }

  const decoded: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error: JsonWebTokenError) => {
      //Token expired
      if (error.name === 'TokenExpiredError') {
        const newToken = jwt.sign(decoded.id, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30s',
        });
        res.cookie('Authorization', newToken);
      } else {
        return unauthorizeResponse();
      }
    }
  );
  const userIdFromClient = decoded.id;

  const [users]: any[] = await sql
    .promise()
    .query(
      `Select email, username, gender, birthday from user where user.id = ${userIdFromClient}`
    );

  if (users.length === 0) {
    return unauthorizeResponse();
  }
  req.user = users[0];

  return next();
};

export default authorizeToken;
