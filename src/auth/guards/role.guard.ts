import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { truncate } from 'fs';

@Injectable()
export class RoleGuard implements CanActivate {


  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const roles: string[] = this.reflector.get<string[]>('role', context.getHandler());

    if(!roles){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    const authRole = roles.includes(user.role);

    return user && authRole;
  }
}
