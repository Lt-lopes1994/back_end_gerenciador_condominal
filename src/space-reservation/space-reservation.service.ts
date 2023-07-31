import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { SpaceReservation } from './entities/space-reservation.entity';
import { CreateSpaceReservationDto } from './dto/create-space-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnSpaceReservationDto } from 'src/dto/returnSpaceReservatino';
import { UpdateSpaceReservationDto } from './dto/update-space-reservation.dto';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class SpaceReservationService {
    constructor(@InjectModel('SpaceReservation') private readonly spaceReservationModel: Model<SpaceReservation>){}

    async create(createSpaceReservationDto: CreateSpaceReservationDto): Promise<SpaceReservation>{
        
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

        const newReservation = new this.spaceReservationModel(createSpaceReservationDto);
        return await newReservation.save();
    }

    async findAll(): Promise<ReturnSpaceReservationDto[]>{
        const findSpaceReservation = await this.spaceReservationModel.find()
        .where({ activebit: true })
        .exec()

        if (!findSpaceReservation) {
            throw new NotFoundException('nenhuma reserva de espaço encontrada');
        }

        if(findSpaceReservation){
            const returnSpaceReservation: ReturnSpaceReservationDto[] = findSpaceReservation.map((reservation) =>{
                return {
                    _id: reservation.id,
                    commonAreaId: reservation.commonAreaId,
                    date: reservation.date,
                    email: reservation.email,
                    message: reservation.message,
                    name: reservation.name,
                    people: reservation.people,
                    phone: reservation.phone,
                    time: reservation.time,
                }
            })
            return returnSpaceReservation
        }
    }

    async findOneId(id: string): Promise<ReturnSpaceReservationDto | undefined>{
        const foundReservation = await this.spaceReservationModel.findOne({ _id: id }).exec()

        if(!foundReservation){
            throw new NotFoundException('Reserva de espaço não encontrada');
        }

        const returnSpaceReserva: ReturnSpaceReservationDto = {
            _id: foundReservation.id,
            commonAreaId: foundReservation.commonAreaId,
            date: foundReservation.date,
            email: foundReservation.email,
            message: foundReservation.message,
            name: foundReservation.name,
            people: foundReservation.people,
            phone: foundReservation.phone,
            time: foundReservation.time
        } 

        return returnSpaceReserva
    }

    async update(id: string, updateSpaceReservationDto: UpdateSpaceReservationDto): Promise<ResultDto>{
        const foundReservation = await this.spaceReservationModel.findOne({_id: id})

        if (!foundReservation) {
            throw new NotFoundException('Reserva de espaço não encontrada');
          }

        if(updateSpaceReservationDto.commonAreaId){
            foundReservation.commonAreaId = updateSpaceReservationDto.commonAreaId
        }  

        if(updateSpaceReservationDto.date){
           foundReservation.date = updateSpaceReservationDto.date
        } 

        if(updateSpaceReservationDto.email){
            foundReservation.email = updateSpaceReservationDto.email
        }
        
        if(updateSpaceReservationDto.message){
            foundReservation.message = updateSpaceReservationDto.message
        } 

        if(updateSpaceReservationDto.name){
            foundReservation.name = updateSpaceReservationDto.name
        } 

        if(updateSpaceReservationDto.people){
            foundReservation.people = updateSpaceReservationDto.people
        } 

        if(updateSpaceReservationDto.phone){
            foundReservation.phone = updateSpaceReservationDto.phone
        } 

        if(updateSpaceReservationDto.time){
            foundReservation.time = updateSpaceReservationDto.time
        } 

        if(updateSpaceReservationDto.phone){
            foundReservation.phone = updateSpaceReservationDto.phone
        } 

        await foundReservation.save()

        return {
            message: 'Espaço reservado atualizada com sucesso',
            status: 200,
          };
    }

    async remove(id: string): Promise<ResultDto>{
        await this.findOneId(id)

        const updateActive = { $set: { activebit: false } }

        await this.spaceReservationModel.updateOne({ _id: id },  updateActive).exec()

        return {
            message: 'Reserva de espaço desativada com sucesso',
            status: 200,
          };
    }
}
