import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.usersService.findById(decoded.id);
          req['user'] = user;
        } catch (error) {}
      }
    }
    next();
  }
}

export const JwtMiddlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if ('x-jwt' in req.headers) {
    const token = req.headers['x-jwt'];
  }
  next();
};
