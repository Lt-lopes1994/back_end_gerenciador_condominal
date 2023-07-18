import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from 'src/dto/result.dto';
import { ReturnUserDto } from 'src/dto/returnUser.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) { }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<ResultDto> {
    await this.usersService.create(data);

    return {
      message: 'Usuário cadastrado com sucesso',
      status: 200,
    };
  }

  @Get('redefinir-senha')
  async sendEmail(@Body() { email }: { email: string }): Promise<ResultDto> {
    return await this.usersService.forgotPassword(email);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('teste')
  async teste() {
    return 'teste';
  }

  @UseGuards(JwtAuthGuard)
  @Get('listar')
  async findAll(): Promise<ReturnUserDto[]> {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch('redefinir-senha/:id')
  updatePassword(@Param('id') id: string, @Body() updatePassword: UpdateUserDto) {
    return this.usersService.updatePassword(id, updatePassword);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:id')
  updateRole(@Param('id') id: string, @Body() userRole: UpdateUserDto) {
    return this.usersService.updateRole(id, userRole);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
