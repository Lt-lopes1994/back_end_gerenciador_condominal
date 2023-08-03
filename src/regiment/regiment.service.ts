import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResultDto } from 'src/dto/result.dto';
import { Regiment } from './entities/regiment.entity';

@Injectable()
export class RegimentService {
  constructor(
    @InjectModel('Regiment')
    private readonly regiment: Model<Regiment>
  ) { }

  async uploadFile(file: Express.Multer.File): Promise<ResultDto> {
    return {
      message: 'Condomínio cadastrado',
      status: 201
    }
  }
}
