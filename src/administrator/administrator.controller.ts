import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from 'src/dto/result.dto';
import { ReturnAdministratorDto } from 'src/dto/returnAdministrator.dto';

@ApiTags('administrators')
@Controller('administrators')
export class AdministratorController {
  constructor(
    private readonly administratorService: AdministratorService
  ) { }

  @Post()
  async create(@Body() data: CreateAdministratorDto): Promise<ResultDto> {
    await this.administratorService.create(data);

    return {
      message: 'Administradora cadastrada com sucesso',
      status: 200,
    };
  }

  @Get('listar')
  async findAll(): Promise<ReturnAdministratorDto[]> {
    return await this.administratorService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.administratorService.findOneId(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateAdministratorDto: UpdateAdministratorDto) {
    return this.administratorService.update(id, updateAdministratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administratorService.remove(+id);
  }
}
