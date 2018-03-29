import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerApi } from '../../glob';
import { UserService } from '../services';

@Controller()
export class UserController {
    constructor(private userService: UserService) {}
}
