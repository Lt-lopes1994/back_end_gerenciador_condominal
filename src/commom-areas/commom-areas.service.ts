import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommomAreaDto } from './dto/create-commom-area.dto';
import { UpdateCommomAreaDto } from './dto/update-commom-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommomArea } from './entities/commom-area.entity';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class CommomAreasService {
  constructor(
    @InjectModel('CommomArea')
    private readonly commomArea: Model<CommomArea>,
  ) {}

  async create(createCommomAreaDto: CreateCommomAreaDto): Promise<ResultDto> {
    const { name, condominiumId, description } = createCommomAreaDto;

    if (!name || !condominiumId || !description) {
      throw new BadRequestException('Todos os campos são obrigatórios');
    }

    const foundCommomArea = await this.findByName(name);

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

  async findAll(): Promise<CommomArea[]> {
    return await this.commomArea.find();
  }

  async findOne(id: number): Promise<CommomArea> {
    return await this.commomArea.findOne({ _id: id });
  }

  async update(
    id: number,
    updateCommomAreaDto: UpdateCommomAreaDto,
  ): Promise<ResultDto> {
    const { name } = updateCommomAreaDto;

    const foundCommomArea = await this.findByName(name);

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

  remove(id: number) {
    return `This action removes a #${id} commomArea`;
  }

  private async findByName(name: string): Promise<CommomArea> {
    const foundCommomArea = await this.commomArea.findOne({ name });

    return foundCommomArea;
  }
}
