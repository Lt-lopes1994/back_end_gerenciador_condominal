import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { UsersService } from 'src/users/users.service';
import { Condominium } from './entities/condominium.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultDto } from 'src/dto/result.dto';

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
  ) { }

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

    const foundCondominiun = await this.findOneByName(name);

    if (foundCondominiun) {
      throw new BadRequestException('Condomínio já cadastrado');
    }

    const newCondominium = new this.data(createCondominiumDto);

    console.log(newCondominium);

    return newCondominium.save();
  }

  async findAll(): Promise<Condominium[]> {
    const foundCondominiun = await this.data
      .find()
      .populate({ path: 'user', select: 'name -_id', model: 'User' })
      .exec();

    return foundCondominiun;
  }

  async findOne(id: string): Promise<Condominium> {
    const foundCondominiun = await this.data
      .findById(id)
      .populate({
        path: 'user',
        select: 'name -_id',
        model: 'User',
      })
      .exec();

    return foundCondominiun;
  }

  async findOneNoPopulate(id: string): Promise<Condominium> {
    const foundCondominiun = await this.data.findById(id).exec();

    if (!foundCondominiun) {
      throw new NotFoundException('Condominio não encontrado');
    }

    return foundCondominiun;
  }

  async findOneByName(name: string): Promise<Condominium> {
    const foundCondominiun = await this.data.findOne({ name }).exec();

    return foundCondominiun;
  }

  async update(
    id: string,
    updateCondominiumDto: UpdateCondominiumDto,
  ): Promise<ResultDto> {
    const { user } = updateCondominiumDto;

    // if (!user) {
    //   throw new BadRequestException('Usuário não informado');
    // }

    const foundCondominiun = await this.findOneNoPopulate(id);

    // const foundUser = await this.usersService.findOneId(user);

    // if (foundCondominiun.user !== foundUser.id) {
    //   throw new BadRequestException(
    //     'Condomínio não pertence ao usuário. Operação não permitida',
    //   );
    // }

    if (name) {
      foundCondominiun.name = name;
    }

    if (!foundCondominiun) {
    }

    await foundCondominiun.save();

    return {
      message: 'Condomínio atualizado com sucesso',
      status: 200,
    };
  }

  async remove(id: string): Promise<ResultDto> {
    const foundCondominiun = await this.findOneNoPopulate(id);

    if (!foundCondominiun) {
      throw new NotFoundException('Condomínio não encontrado');
    }

    await foundCondominiun.updateOne({ activebit: false });

    return {
      message: 'Condomínio removido com sucesso',
      status: 200,
    };
  }
}
