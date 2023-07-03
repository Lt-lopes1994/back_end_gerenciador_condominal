import { Injectable } from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { UsersService } from 'src/users/users.service';
import { Condominium } from './entities/condominium.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//* O modulo service serve para fazer as regras de negocio, onde todos os dados são validados e tratados antes de serem enviados para o banco de dados
//* O modulo service é responsável por fazer a comunicação com o banco de dados
//* O modulo service é responsável por fazer a comunicação com o modulo controller
//* O modulo service é responsável por fazer a comunicação com o modulo repository
//* O modulo service é responsável por fazer a comunicação com o modulo dto
//* O modulo service é responsável por fazer a comunicação com o modulo entity
//* O modulo service é responsável por fazer a comunicação com o modulo schema
//* O modulo service é responsável por fazer a comunicação com o modulo interface
//* O modulo service é responsável por fazer a comunicação com o modulo types

@Injectable()
export class CondominiumService {
  //* O @InjectModel('Condominium') private readonly data: Model<Condominium> é necessário para que o MongooseModule possa acessar o schema do Condominium
  constructor(
    @InjectModel('Condominium') private readonly data: Model<Condominium>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createCondominiumDto: CreateCondominiumDto,
  ): Promise<Condominium> {
    const { name, streetNumber, streetName, neighborhood, city, user } =
      createCondominiumDto;

    if (
      !name ||
      !streetNumber ||
      !streetName ||
      !neighborhood ||
      !city ||
      !user
    ) {
      throw new Error('Todos os campos são obrigatórios');
    }

    const foundUser = await this.usersService.findOneId(user);

    const newCondominium = new this.data(createCondominiumDto);

    console.log(newCondominium);

    return newCondominium.save();
  }

  findAll() {
    return `This action returns all condominium`;
  }

  findOne(id: string) {
    return `This action returns a #${id} condominium`;
  }

  update(id: string, updateCondominiumDto: UpdateCondominiumDto) {
    return `This action updates a #${id} condominium`;
  }

  remove(id: string) {
    return `This action removes a #${id} condominium`;
  }
}
