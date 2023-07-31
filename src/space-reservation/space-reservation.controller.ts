import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from 'src/dto/result.dto';
import { CreateSpaceReservationDto } from './dto/create-space-reservation.dto';
import { SpaceReservationService } from './space-reservation.service';
import { ReturnSpaceReservationDto } from 'src/dto/returnSpaceReservatino';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation.dto';

@ApiTags('reservation')
@Controller('reservation')
export class SpaceReservationController {
  constructor(
    private readonly spaceReservationService: SpaceReservationService
  ){ }
  
  @Post()
  async create(@Body() data: CreateSpaceReservationDto): Promise<ResultDto>{
    await this.spaceReservationService.create(data)

    return {
      message: 'Espaço reservado com sucesso',
      status: 201,
    }
  }

  @Get('listar')
  async findAll(): Promise<ReturnSpaceReservationDto[]>{
    return await this.spaceReservationService.findAll()
  }

  @Get('/:id')
  async findOne(@Param('id') id: string){
    return await this.spaceReservationService.findOneId(id)
  }
  
  @Patch('/:id')
  upadate(@Param('id') id: string, @Body() updateSpaceReservationDto:UpdateSpaceReservationDto) {
    return this.spaceReservationService.update(id, updateSpaceReservationDto)
  }

  @Delete('/:id')
  remove(@Param('id') id: string){
    return this.spaceReservationService.remove(id)
  }
  
  @Get('teste')
  async teste() {
    return 'teste do space-reservation';
  }
}
