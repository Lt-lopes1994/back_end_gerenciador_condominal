import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  tower?: string;
  door?: number;
  activebit?: boolean;
  role?: string;
  verificationCode?: number;
}