import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = createUserDto.email;

    if (!email) {
      throw new BadRequestException('E-mail não informado');
    }

    if (!createUserDto.password) {
      throw new BadRequestException('Senha não informada');
    }

    if (createUserDto.password !== createUserDto.passwordConfirm) {
      throw new BadRequestException('Senhas não conferem');
    }

    if (!createUserDto.name) {
      throw new BadRequestException('Nome não informado');
    }

    if (!createUserDto.door || createUserDto.door < 1) {
      throw new BadRequestException('Número da porta não informada!');
    }

    if (!createUserDto.tower) {
      throw new BadRequestException('Torre não informada!');
    }

    const foundUser = await this.userModel.findOne({ email: email }).exec();

    if (foundUser) {
      throw new ForbiddenException('Usuário já cadastrado');
    }

    const updateActive = { $set: { activebit: true } };

    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
