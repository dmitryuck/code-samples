import bcrypt from 'bcrypt';
import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core'
import { Request, Response } from 'express';
import { User } from '../classes';
import { UserModel } from '../common';
import { Message, User as UserInterface, UserRoles } from '../../glob';
import { ResponseObject } from '../classes';

@Component()
export class UserService {
    async createOne(body: UserInterface, done: Function) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(body.password, salt);

        const params = {
            name: body.name,
            email: body.email,
            password: hash,
            salt: salt,
            resetKey: '',
            resetExt: null,
            photos: '',
            countryId: body.countryId,
            active: true,
            balance: 0,
            donates: 0,
            rating: 0,
            deals: 0,
            role: UserRoles.USER,
            wallet: '',
            config: [{
                param: 'man',
                value: 'yes'
            }]
        };

        const user = await UserModel.create(params);

        if (user) {
            return done(null, user);
        } else {
            return done(Message.USER_SIGN_UP_ERROR);
        }
    }

    isLogged(req: Request, res: Response) {
        let user = null;
        if (req.user) {
            user = User.response(new User(req.user));
        }
        return ResponseObject.makeSuccess(res, user);
    }

    localLogin(user: User, password: string, done: Function) {
        if (!user) {
            return done(Message.USER_NOT_FOUND_BY_EMAIL);
        }

        const equal = bcrypt.compareSync(password, user.password);

        if (equal) {
          return done(null, user);
        } else {
          return done(Message.ENTERED_PASSWORD_INCORRECT);
        }
    }

    async findById(id: string) {
        const user = await UserModel.findById(id);
        return user ? new User(user) : null;
    }

    async findByEmail(email: string) {
        const user = await UserModel.findOne({'email': email});
        return user ? new User(user) : null;
    }
}
