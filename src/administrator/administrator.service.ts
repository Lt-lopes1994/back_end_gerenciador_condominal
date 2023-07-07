import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Administrator } from './entities/administrator.entity';
import { Model } from 'mongoose';
import { ReturnAdministratorDto } from 'src/dto/returnAdministrator.dto';

@Injectable()
export class AdministratorService {
  constructor(@InjectModel('Administrator') private readonly administratorModel: Model<Administrator>) { }

  async create(createAdministratorDto: CreateAdministratorDto) {
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

  async findAll() {
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

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
