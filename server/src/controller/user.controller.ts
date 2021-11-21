import { AuthCredental } from '@models/credentals.model';
import { MessageType } from '@models/Response.model';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import StatusCode from 'http-status-codes';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import sql from 'src/database/config';
import GeneratedResponse from 'src/shared/ResponseSchema';
import { isUserEnableMail } from 'src/utils/constants/constants';

dotenv.config();

export default class UserController {
  public static async signUp(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, AuthCredental>>> {

    const { email, password, gender, birthday, username } = req.body;

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const [users]: any[] = await sql
      .promise()
      .query(`Select * from user where user.email = '${email}'`);

    if (users.length !== 0) {
      return res
        .status(StatusCode.CONFLICT)
        .json(GeneratedResponse(null, 'This email is already exist!', MessageType.ERROR));
    } else {
      try {
        await sql.promise().query(
          `insert into user (email, password , username, birthday, gender  ) values ('${email}', '${hashedPassword}', '${username}', '${birthday}', '${gender}');
            
            `
        );

        const [userCreated]: any[] = await sql
          .promise()
          .query(`select * from user where user.email = '${email}'`);

        const token = jwt.sign({ id: userCreated[0].id }, process.env.ACCESS_TOKEN_SECRET);
    
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'huylovepupu@gmail.com',
            pass: 'huylovepupu1608',
          },
        });

        await transporter.sendMail({
          from: 'huylovepupu@gmail.com', // sender address
          to: email, // list of receivers
          subject: 'Verify social media account.', // Subject line
          text: 'Please click the link above to verify your account?', // plain text body
          html: `
          <p>Please click the link above to verify your account!</p>
          <b>http://localhost:8080/api/verify-account/${token}</b>`, // html body
        });
         
      
        return res
          .status(StatusCode.CREATED)
          .json(
            GeneratedResponse(
              null,
              'Please check your email and verify to continue!',
              MessageType.SUCCESS
            )
          );
      } catch (error) {
        return res
          .status(StatusCode.CONFLICT)
          .json(GeneratedResponse(null, error.message, MessageType.ERROR));
      }
    }
  }

  public static async signIn(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, AuthCredental>>> {
    const { email, password } = req.body;
    
    const [users]: any[] = await sql
      .promise()
      .query(
        `Select * from user where user.email = '${email}' and user.isEnable = ${isUserEnableMail.enabled}`
      );

    const user = users[0];

    if (users.length === 0) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json(
          GeneratedResponse(
            null,
            'Login failed! Please check your credential again!',
            MessageType.ERROR
          )
        );
    }

    const isPasswordMisMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMisMatch) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json(
          GeneratedResponse(
            null,
            'Login failed! Please check your credential again!',
            MessageType.ERROR
          )
        );
    }
   
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);

    res.cookie('Authorization', token, {
      httpOnly: true
    });
    return res
      .status(StatusCode.ACCEPTED)
      .json(GeneratedResponse(user, 'Welcome to Pupu webapp!', MessageType.SUCCESS));
  }
  public static async verifyEmail(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const token = req.params.token;
    try {
      const decoded: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userIdFromClient = decoded.id;

      let [users]: any[] = await sql
        .promise()
        .query(`Select * from user where user.id = ${userIdFromClient}`);

      if (users.length === 0) {
        return res
          .status(StatusCode.UNAUTHORIZED)
          .json(GeneratedResponse(null, 'Unauthorized!', MessageType.ERROR));
      }

      await sql
        .promise()
        .query(
          `update user set isEnable = ${isUserEnableMail.enabled} where user.id = ${userIdFromClient}`
        );

      return res
        .status(StatusCode.CREATED)
        .send(GeneratedResponse(null, 'http://localhost:3000/login', MessageType.SUCCESS));
    } catch (error) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json(GeneratedResponse(null, 'Unauthorized!', MessageType.ERROR));
    }
  }
}
