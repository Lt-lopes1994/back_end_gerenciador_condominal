import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnUserDto } from 'src/dto/returnUser.dto';
import { ResultDto } from '../dto/result.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private mailService: MailerService
  ) { }


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

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      +process.env.SALT,
    );

    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const foundUser = await this.userModel
      .find()
      .where({ activebit: true })
      .exec();

    if (!foundUser) {
      throw new NotFoundException('nenhum usuário encontrado');
    }

    if (foundUser) {
      const returnUser: ReturnUserDto[] = foundUser.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          door: user.door,
          tower: user.tower,
          role: user.role,
        };
      });

      return returnUser;
    }

    return foundUser;
  }

  async findOneId(id: string): Promise<ReturnUserDto | undefined> {
    const foundUser = await this.userModel.findOne({ _id: id }).exec();

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (foundUser) {
      const returnUser: ReturnUserDto = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        door: foundUser.door,
        tower: foundUser.tower,
        role: foundUser.role,
      };

      return returnUser;
    }
  }

  async findOneLogin(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResultDto> {
    const foundUser = await this.userModel.findOne({ _id: id }).exec();

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (updateUserDto.password !== updateUserDto.passwordConfirm) {
      throw new BadRequestException('Senhas não conferem');
    }

    if (updateUserDto.password) {
      foundUser.password = updateUserDto.password;
    }

    if (updateUserDto.name) {
      foundUser.name = updateUserDto.name;
    }

    if (updateUserDto.email) {
      foundUser.email = updateUserDto.email;
    }

    if (updateUserDto.door) {
      foundUser.door = updateUserDto.door;
    }

    if (updateUserDto.tower) {
      foundUser.tower = updateUserDto.tower;
    }

    await foundUser.save();

    return {
      message: 'Usuário atualizado com sucesso',
      status: 200,
    };
  }

  async updateRole(id: string, userRole: UpdateUserDto): Promise<ResultDto> {
    await this.findOneId(id);

    if (userRole.role === 'admin' || userRole.role === 'user') {
      await this.userModel.updateOne(
        { _id: id },
        { $set: { role: userRole.role } },
      );
      console.log(id, userRole.role);
    } else {
      throw new BadRequestException('Essa não é uma role válida');
    }

    return {
      message: 'Role atualizada com sucesso',
      status: 200,
    };
  }

  async forgotPassword(email: string): Promise<ResultDto> {
    const foundUser = await this.findOneLogin(email.trim());

    if (!foundUser) {
      throw new NotFoundException('O email informado não está cadastrado.');
    }

    const expirationTime = new Date(Date.now() + 60 * 60 * 1000);

    const codeGenerator = Math.floor(Math.random() * 1000000)

    foundUser.verificationCode = codeGenerator
    foundUser.expirationTime = expirationTime

    await foundUser.save();

    await this.mailService.sendMail({
      to: email.trim(),
      subject: 'Recuperar senha',
      template: 'forgotPass',
      context: {
        email: {
          name: foundUser.name,
          link: codeGenerator
        }
      }
    });

    return {
      message: 'Email enviado com sucesso',
      status: 200,
    }
  }

  async validateCode(code: number): Promise<ReturnUserDto | undefined> {
    if (!code) {
      throw new BadRequestException('Código não informado');
    }

    const foundUser = await this.userModel.findOne({ verificationCode: code });

    if (!foundUser) {
      throw new NotFoundException('Código inválido');
    }

    const returnUser: ReturnUserDto = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      door: foundUser.door,
      tower: foundUser.tower,
      role: foundUser.role,
    }

    return returnUser;
  }

  async updatePassword(id: string, updatePassword: UpdateUserDto): Promise<ResultDto> {
    const foundUser = await this.findOneId(id);

    if (!updatePassword.password) {
      throw new BadRequestException('Todos os campos são necessários');
    }

    if (updatePassword.password !== updatePassword.passwordConfirm) {
      throw new BadRequestException('Senhas não conferem');
    }

    updatePassword.password = bcrypt.hashSync(
      updatePassword.password,
      +process.env.SALT,
    );

    await this.userModel.updateOne({ _id: id }, { $set: { password: updatePassword.password } });

    return {
      message: 'Senha atualizada com sucesso',
      status: 200,
    };
  }

  async remove(id: string): Promise<ResultDto> {
    const foundUser = this.findOneId(id);

    if (!foundUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updateActive = { $set: { activebit: false } };

    await this.userModel.updateOne({ _id: id }, updateActive).exec();

    return {
      message: 'Usuário desativado com sucesso',
      status: 200,
    };
  }
}
