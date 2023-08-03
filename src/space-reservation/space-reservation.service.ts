import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { SpaceReservation } from './entities/space-reservation.entity';
import { CreateSpaceReservationDto } from './dto/create-space-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnSpaceReservationDto } from 'src/dto/returnSpaceReservatino';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation.dto';
import { ResultDto } from 'src/dto/result.dto';
import { CondominiumService } from 'src/condominium/condominium.service';
import { CommomAreasService } from 'src/commom-areas/commom-areas.service';

@Injectable()
export class SpaceReservationService {
  constructor(
    @InjectModel('SpaceReservation')
    private readonly spaceReservationModel: Model<SpaceReservation>,
  ) {}

  async create(
    createSpaceReservationDto: CreateSpaceReservationDto,
  ): Promise<ResultDto> {
    if (!createSpaceReservationDto.commonAreaId) {
      throw new BadRequestException('Nome do espaço não informado');
    }

    if (!createSpaceReservationDto.date) {
      throw new BadRequestException('Data não informado');
    }

    if (!createSpaceReservationDto.email) {
      throw new BadRequestException('E-mail não informado');
    }

    if (!createSpaceReservationDto.name) {
      throw new BadRequestException('Nome não informado');
    }

    if (!createSpaceReservationDto.people) {
      throw new BadRequestException('Número de pessoas não informado');
    }

    if (!createSpaceReservationDto.phone) {
      throw new BadRequestException('Telefone não informado');
    }

    if (!createSpaceReservationDto.time) {
      throw new BadRequestException('Tempo de início da reserva não informado');
    }

    const newReservation = new this.spaceReservationModel(
      createSpaceReservationDto,
    );

    await newReservation.save();

    return {
      message: 'Espaço reservado com sucesso',
      status: 201,
    };
  }

  async findAll(): Promise<ReturnSpaceReservationDto[]> {
    return await this.spaceReservationModel.find().exec();
  }

  async findOneId(id: string): Promise<ReturnSpaceReservationDto | undefined> {
    return await this.spaceReservationModel.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateSpaceReservationDto: UpdateSpaceReservationDto,
  ): Promise<ResultDto> {
    const foundReservation = await this.spaceReservationModel.findOne({
      _id: id,
    });

    if (!foundReservation) {
      throw new NotFoundException('Reserva de espaço não encontrada');
    }

    const updateReservation = {
        $set: updateSpaceReservationDto,
      },
      options = { upsert: true };

    await this.spaceReservationModel
      .updateOne({ _id: id }, updateReservation, options)
      .exec();

    return {
      message: 'Espaço reservado atualizada com sucesso',
      status: 200,
    };
  }

  async remove(id: string): Promise<ResultDto> {
    await this.findOneId(id);

    const updateActive = { $set: { activebit: false } };

    await this.spaceReservationModel
      .updateOne({ _id: id }, updateActive)
      .exec();

    return {
      message: 'Reserva de espaço desativada com sucesso',
      status: 200,
    };
  }

  async teste() {
    return 'teste';
  }
}
