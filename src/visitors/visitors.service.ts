import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';

@Injectable()
export class VisitorsService {

  constructor(
    @InjectModel('Visitor')
    private readonly visitorModel: Model<Visitor>
  ) { }
  async create(createVisitorDto: CreateVisitorDto, photo: Express.MulterS3.File) {
    let {
      cpf,
      name,
      visit_reason,
      resident_name,
      door_visited,
      tower_visited
    } = createVisitorDto;

    if (
      !cpf ||
      !name ||
      !visit_reason ||
      !resident_name ||
      !door_visited || door_visited < 1 ||
      !tower_visited ||
      !photo
    ) {
      throw new BadRequestException('Todos os campos são obrigatórios.');
    }

    const setExpirationDate = Date.now() + 24 * 60 * 60 * 1000;
    const expirationDate = new Date(setExpirationDate);

    const newVisitor = new this.visitorModel({
      cpf,
      name,
      visit_reason,
      resident_name,
      door_visited,
      tower_visited,
      visitor_photo: {
        name: photo.originalname,
        key: photo.key,
        url: photo.location
      },
      expireAt: expirationDate.toISOString()
    });

    return await newVisitor.save();
  }

  findAll() {
    return `This action returns all visitors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitor`;
  }

  update(id: number, updateVisitorDto: UpdateVisitorDto) {
    return `This action updates a #${id} visitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitor`;
  }
}
