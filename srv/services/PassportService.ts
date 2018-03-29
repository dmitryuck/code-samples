import passport from 'passport';
import passportLocal from 'passport-local';
import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { UserService } from './UserService';
import { User, ResponseObject } from '../classes';
import { Message } from '../../glob';

const LocalStrategy: any = passportLocal.Strategy;

const SUCCES_SIGNUP_REDIRECT = '/profile';
const FAILED_SIGNUP_REDIRECT = '/registration';

@Component()
export class PassportService {
    constructor(private userService: UserService) {
        this.initPassport();
        this.initLocal();
    }

    initPassport() {
        passport.serializeUser((user: User, done: Function) => {
            done(null, user._id);
        });

        passport.deserializeUser(async (id: string, done: Function) => {
            const user = await this.userService.findById(id);
            done(!user, user);
        });
    }

    initLocal() {
        passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email: string, password: string, done: Function) => {
            const user = await this.userService.findByEmail(email);
            this.userService.localLogin(user, password, done);
        }));

        passport.use('local-signup', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
        }, (req: any, email: string, password: string, done: Function) => {
            const body = req.body;
            this.userService.createOne(body, done);
        }));
    }

    isLogged(req, res) {
        this.userService.isLogged(req, res);
    }

    localLogin(req, res, next) {
        passport.authenticate('local-login', (err, user) => {
            if (err) {
                ResponseObject.makeError(res, err);
                return next(err);
            }

            if (!user) {
                return ResponseObject.makeError(res, Message.EMAIL_OR_PASSWORD_INCORRECT);
            }

            req.logIn(user, (e) => {
                if (e) {
                    ResponseObject.makeError(res, e);
                    return next(e);
                }

                return ResponseObject.makeSuccess(res, User.response(user));
            });
        })(req, res, next);
    }

    localSignup(req, res, next) {
        passport.authenticate('local-signup', {
            successRedirect: SUCCES_SIGNUP_REDIRECT,
            failureRedirect: FAILED_SIGNUP_REDIRECT
        }, (err, user) => {
            if (err) {
                ResponseObject.makeError(res, err);
                return next(err);
            }

            if (!user) {
                return ResponseObject.makeError(res, Message.USER_SIGN_UP_ERROR);
            }

            return ResponseObject.makeSuccess(res, User.response(user));
        })(req, res, next);
    }
}
