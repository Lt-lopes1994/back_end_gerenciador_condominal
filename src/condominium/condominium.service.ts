import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultDto } from 'src/dto/result.dto';
import { UsersService } from 'src/users/users.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { Condominium } from './entities/condominium.entity';

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
  //* O @InjectModel('Condominium') private readonly condominium: Model<Condominium> é necessário para que o MongooseModule possa acessar o schema do Condominium
  constructor(
    @InjectModel('Condominium')
    private readonly condominium: Model<Condominium>,
    private readonly usersService: UsersService,
  ) { }

  async create(
    createCondominiumDto: CreateCondominiumDto,
  ): Promise<ResultDto> {
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
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    const foundUser = await this.usersService.findOneId(user);

    const foundCondominiun = await this.findOneByName(name);

    if (foundCondominiun) {
      throw new BadRequestException('Condomínio já cadastrado');
    }

    createCondominiumDto.codeCondominium = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const foundCodeCondominium = await this.findCode(createCondominiumDto.codeCondominium);

    if (foundCodeCondominium) {
      createCondominiumDto.codeCondominium = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    }

    const newCondominium = new this.condominium(createCondominiumDto);

    newCondominium.save();

    return {
      message: 'Condomínio cadastrado',
      status: 201
    }
  }

  async findCondominiumByCode(code: string): Promise<Condominium | void> {
    const foundCondominium = await this.findCode(code);

    if (!foundCondominium) {
      throw new NotFoundException('Condomínio não encontrado!');
    }

    return foundCondominium;
  }

  private async findCode(code: string): Promise<Condominium | void> {
    const foundCondominium = await this.condominium.findOne({ codeCondominium: code });

    return foundCondominium;
  }

  async findAll(): Promise<Condominium[]> {
    const foundCondominiun = await this.condominium
      .find()
      .populate({ path: 'user', select: 'name -_id', model: 'User' })
      .exec();

    return foundCondominiun;
  }

  async findOne(id: string): Promise<Condominium> {
    const foundCondominiun = await this.condominium
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
    const foundCondominiun = await this.condominium.findById(id).exec();

    if (!foundCondominiun) {
      throw new NotFoundException('Condominio não encontrado');
    }

    return foundCondominiun;
  }

  async findOneByName(name: string): Promise<Condominium> {
    const foundCondominiun = await this.condominium.findOne({ name }).exec();

    return foundCondominiun;
  }

  async update(
    id: string,
    updateCondominiumDto: UpdateCondominiumDto,
  ): Promise<ResultDto> {
    const { user, name } = updateCondominiumDto;

    if (!user) {
      throw new BadRequestException('Usuário não informado');
    }

    const foundCondominiun = await this.findOneNoPopulate(id);

    const foundUser = await this.usersService.findOneId(user);

    if (foundCondominiun.user.toString() !== foundUser.id) {
      throw new BadRequestException(
        'Condomínio não pertence ao usuário. Operação não permitida',
      );
    }

    if (name) {
      foundCondominiun.name = name;
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
