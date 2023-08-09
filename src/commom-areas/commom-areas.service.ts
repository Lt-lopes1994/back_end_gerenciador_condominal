import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ResultDto } from 'src/dto/result.dto';
import { CreateCommomAreaDto } from './dto/create-commom-area.dto';
import { UpdateCommomAreaDto } from './dto/update-commom-area.dto';
import { CommomArea } from './entities/commom-area.entity';

@Injectable()
export class CommomAreasService {
  constructor(
    @InjectModel('CommomArea')
    private readonly commomArea: Model<CommomArea>,
  ) {}

  async create(createCommomAreaDto: CreateCommomAreaDto): Promise<ResultDto> {
    const { name, condominiumId, description, urlImage } = createCommomAreaDto;

    if (!name || !condominiumId || !description || !urlImage) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    const foundCommomArea = await this.findByNameObjId(name, condominiumId);

    console.log(foundCommomArea);

    if (foundCommomArea) {
      throw new BadRequestException('Área comum já cadastrada');
    }

    const commomArea = new this.commomArea(createCommomAreaDto);

    await commomArea.save();

    return {
      message: 'Área comum cadastrada com sucesso',
      status: 201,
    };
  }

  async findAll(condominiumId: string): Promise<CommomArea[]> {
    return await this.commomArea.find().where({ condominiumId }).exec();
  }

  async findOne(id: string): Promise<CommomArea> {
    return await this.commomArea.findOne({ _id: id }).exec();
  }

  async update(
    id: string,
    updateCommomAreaDto: UpdateCommomAreaDto,
  ): Promise<ResultDto> {
    const { name } = updateCommomAreaDto;

    const foundCommomArea = await this.findOne(id);

    console.log(foundCommomArea);

    if (!foundCommomArea) {
      throw new BadRequestException('Área comum não cadastrada');
    }

    await this.commomArea
      .updateOne({ $set: updateCommomAreaDto })
      .where({ _id: id })
      .exec();

    return {
      message: 'Área comum atualizada com sucesso',
      status: 200,
    };
  }

  async remove(_id: string): Promise<ResultDto> {
    const foundCommonArea = await this.commomArea.findOne({ _id }).exec();

    if (!foundCommonArea) {
      throw new BadRequestException('Área comum não cadastrada');
    }

    await this.commomArea.updateOne({ activebit: false }).where({ _id }).exec();

    return {
      message: 'Área comum desabilitada com sucesso',
      status: 200,
    };
  }

  private async findByNameObjId(
    name: string,
    condominiumId: ObjectId,
  ): Promise<CommomArea> {
    const foundCommomArea = await this.commomArea
      .findOne({ name })
      .where({ condominiumId })
      .exec();

    return foundCommomArea;
  }

  private async findByName(name: string, id: string): Promise<CommomArea> {
    const foundCommomArea = await this.commomArea
      .findOne({ name })
      .where({ id })
      .exec();

    return foundCommomArea;
  }
}
