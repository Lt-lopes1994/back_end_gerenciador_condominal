import { Injectable } from '@nestjs/common';
import { CreateCommomAreaDto } from './dto/create-commom-area.dto';
import { UpdateCommomAreaDto } from './dto/update-commom-area.dto';

@Injectable()
export class CommomAreasService {
  create(createCommomAreaDto: CreateCommomAreaDto) {
    return 'This action adds a new commomArea';
  }

  findAll() {
    return `This action returns all commomAreas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commomArea`;
  }

  update(id: number, updateCommomAreaDto: UpdateCommomAreaDto) {
    return `This action updates a #${id} commomArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} commomArea`;
  }
}
