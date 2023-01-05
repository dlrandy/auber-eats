import { SetMetadata } from '@nestjs/common';
import { UserRole } from './../users/entities/user.entity';
export type AllowedRoles = keyof typeof UserRole;
export const Roles = (roles: AllowedRoles[]) => SetMetadata('roles', roles);
