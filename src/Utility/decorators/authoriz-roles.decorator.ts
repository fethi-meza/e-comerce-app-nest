/* eslint-disable prettier/prettier */

import { SetMetadata } from '@nestjs/common';

export const AuthorizRroles = (...roles: string[]) => SetMetadata('allowedRoles', roles);
