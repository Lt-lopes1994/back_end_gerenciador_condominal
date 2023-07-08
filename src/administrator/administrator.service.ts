import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Administrator } from './entities/administrator.entity';
import { Model } from 'mongoose';
import { ReturnAdministratorDto } from 'src/dto/returnAdministrator.dto';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class AdministratorService {
  constructor(@InjectModel('Administrator') private readonly administratorModel: Model<Administrator>) { }

  async create(createAdministratorDto: CreateAdministratorDto): Promise<Administrator> {
    const cnpj = createAdministratorDto.cnpj;

    if (!cnpj) {
      throw new BadRequestException('Cnpj Não informado');
    }

    if (!createAdministratorDto.contactPerson) {
      throw new BadRequestException('Nome do responsável não informado');
    }

    if (!createAdministratorDto.email) {
      throw new BadRequestException('E-mail não informado');
    }

    if (!createAdministratorDto.ie) {
      throw new BadRequestException('Inscrição estadual não informada');
    }

    if (!createAdministratorDto.phone) {
      throw new BadRequestException('Telefone de contato não informado');
    }

    const foundAdministrator = await this.administratorModel.findOne({ cnpj }).exec();

    if (foundAdministrator) {
      throw new ForbiddenException('Administradora já cadastrada');
    }

    const newAdministrator = new this.administratorModel(createAdministratorDto);

    return await newAdministrator.save();
  }

  async findAll(): Promise<ReturnAdministratorDto[]> {
    const foundAdministrators = await this.administratorModel.find()
      .where({ activebit: true })
      .exec();

    if (!foundAdministrators) {
      throw new NotFoundException('Nenhuma administradora encontrada');
    }

    if (foundAdministrators) {
      const returnAdministrator: ReturnAdministratorDto[] = foundAdministrators.map((administrator) => {
        return {
          id: administrator.id,
          cnpj: administrator.cnpj,
          contactPerson: administrator.contactPerson,
          email: administrator.email,
          ie: administrator.ie,
          phone: administrator.phone,
          whatsApp: administrator.whatsApp,
          website: administrator.website
        };
      });

      return returnAdministrator;
    }

    return foundAdministrators;
  }

  async findOneId(id: string): Promise<ReturnAdministratorDto | undefined> {
    const foundAdministrator = await this.administratorModel.findOne({ _id: id })
      .exec();

    if (!foundAdministrator) {
      throw new NotFoundException('Administradora não encontrada');
    }

    const returnAdministrator: ReturnAdministratorDto = {
      id: foundAdministrator.id,
      cnpj: foundAdministrator.cnpj,
      contactPerson: foundAdministrator.contactPerson,
      email: foundAdministrator.email,
      ie: foundAdministrator.ie,
      phone: foundAdministrator.phone,
      whatsApp: foundAdministrator.whatsApp,
      website: foundAdministrator.website
    };

    return returnAdministrator;
  }

  async update(id: string, updateAdministratorDto: UpdateAdministratorDto): Promise<ResultDto> {
    const foundAdministrator = await this.administratorModel.findOne({ _id: id });

    if (!foundAdministrator) {
      throw new NotFoundException('Administradora não encontrada');
    }

    if (updateAdministratorDto.cnpj) {
      foundAdministrator.cnpj = updateAdministratorDto.cnpj;
    }

    if (updateAdministratorDto.contactPerson) {
      foundAdministrator.contactPerson = updateAdministratorDto.contactPerson;
    }

    if (updateAdministratorDto.email) {
      foundAdministrator.email = updateAdministratorDto.email;
    }

    if (updateAdministratorDto.ie) {
      foundAdministrator.ie = updateAdministratorDto.ie;
    }

    if (updateAdministratorDto.phone) {
      foundAdministrator.phone = updateAdministratorDto.phone;
    }

    if (updateAdministratorDto.whatsApp) {
      foundAdministrator.whatsApp = updateAdministratorDto.whatsApp;
    }

    if (updateAdministratorDto.website) {
      foundAdministrator.website = updateAdministratorDto.website;
    }

    await foundAdministrator.save();

    return {
      message: 'Administradora atualizada com sucesso',
      status: 200,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
